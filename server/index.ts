import { Server, createServer } from "http";
import next, { NextApiHandler, NextApiRequest } from "next";
import { Server as socketioServer, Socket } from "socket.io";
import express, { Express, Request, Response } from "express";
import waitingRoomRouter from "./routes/waitingRooms";
import trainingQuestionsRouter from "./routes/trainingQuestions";
import questionsRouter from "./routes/questions";
import { createQuestions } from "./utils/createQuestions";
import {
  GameGroupType,
  IconType,
  GameStateNotification,
  RoomStatus,
} from "./types";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle: NextApiHandler = app.getRequestHandler();
// ゲームのルーム状態
export let gameGroup: GameGroupType[] = [];

app.prepare().then(async () => {
  const expressApp: Express = express();
  // ルーティング
  expressApp.use([waitingRoomRouter, trainingQuestionsRouter, questionsRouter]);

  const server: Server = createServer(expressApp);
  const io: socketioServer = new socketioServer();
  io.attach(server);

  const createNewRoom = (roomId: string, roomLimit: number) => {
    const { questions, displayOrderQuestions } = createQuestions();
    const newGame: GameGroupType = {
      roomId: roomId,
      roomLimit: roomLimit,
      questions: {
        questions: questions,
        displayOrderQuestions: displayOrderQuestions,
        displayingQuestionPosition: 0,
      },
      isStarted: false,
      participatedUsers: [],
    };
    gameGroup.push(newGame);
    return newGame;
  };

  const addNewUser = (
    targetRoom: GameGroupType,
    userId: string,
    icon: IconType,
    userName: string,
    socketId: string
  ) => {
    targetRoom.participatedUsers.push({
      userId: userId,
      iconType: icon,
      userName: userName,
      getCardCount: 0,
      wrongHitCount: 0,
      socketId: socketId,
    });
  };

  const emitRoomStatus = (
    roomStatus: RoomStatus,
    socketID?: string,
    roomId?: string
  ) => {
    console.log("emitRoom", roomStatus);
    switch (roomStatus) {
      case "created":
        io.sockets.emit("roomStatus", {
          status: roomStatus,
        });
        break;
      case "notFound":
      case "playing":
        if (socketID) {
          io.to(socketID).emit("roomStatus", {
            status: roomStatus,
          });
        }
        break;
      case "ready":
      case "waiting":
        if (roomId) {
          io.to(roomId).emit("roomStatus", {
            status: roomStatus,
          });
        }
        break;
      default:
        const _: never = roomStatus;
    }
  };

  const connectionHandler = (socket: Socket) => {
    console.log("接続完了 in server", socket.id);

    // join the room
    socket.on(
      "join",
      ({
        roomId,
        userId,
        icon,
        userName,
      }: {
        roomId: string;
        userId: string;
        icon: IconType;
        userName: string;
      }) => {
        const target = gameGroup.find((g) => g.roomId === roomId);
        // 該当ルームなし
        if (!target) {
          emitRoomStatus("notFound", socket.id);
          return;
        }

        // ゲーム開始済み
        if (target.isStarted) {
          emitRoomStatus("playing", socket.id);
          return;
        }

        // 新規ユーザーの入室
        if (!target.participatedUsers.map((u) => u.userId).includes(userId)) {
          addNewUser(target, userId, icon, userName, socket.id);
          socket.join(roomId);
        }

        const rooms = io.sockets.adapter.rooms.get(roomId);
        if (rooms?.size === target.roomLimit) {
          // 準備完了
          emitRoomStatus("ready", undefined, roomId);
          target.isStarted = true;
        } else {
          emitRoomStatus("waiting", undefined, roomId);
        }
      }
    );

    socket.on(
      "createRoom",
      ({
        roomId,
        userId,
        icon,
        userName,
        roomLimit,
      }: {
        roomId: string;
        userId: string;
        icon: IconType;
        userName: string;
        roomLimit: number;
      }) => {
        const target = gameGroup.find((g) => g.roomId === roomId);
        // ルーム新規作成
        if (!target) {
          const newGame = createNewRoom(roomId, roomLimit);
          addNewUser(newGame, userId, icon, userName, socket.id);
          socket.join(roomId);
          emitRoomStatus("created");
        }
      }
    );

    // 回答イベント
    socket.on(
      "answer",
      (answer: {
        answerID: number;
        userId: string;
        roomId: string;
        displayingPosition: number;
      }) => {
        const game = gameGroup.find((g) => g.roomId === answer.roomId);
        if (game) {
          if (
            game.questions.displayingQuestionPosition !==
            answer.displayingPosition
          ) {
            return;
          }
          const displayingQuestion =
            game.questions.displayOrderQuestions[
              game.questions.displayingQuestionPosition
            ];
          const isCorrect = displayingQuestion.questionId === answer.answerID;
          const user = game.participatedUsers.find(
            (u) => u.userId === answer.userId
          );
          if (user) {
            if (isCorrect) {
              game.questions.displayingQuestionPosition += 1;
              user.getCardCount += 1;
            } else {
              user.wrongHitCount += 1;
            }
          }

          const updateNotification: GameStateNotification = {
            displayPosition: game.questions.displayingQuestionPosition,
            removeTarget: isCorrect ? answer.answerID : undefined,
            playingUsers: game.participatedUsers,
          };
          io.to(answer.roomId).emit("update", {
            gameStatus: updateNotification,
          });
          if (
            game.questions.displayingQuestionPosition ===
            game.questions.displayOrderQuestions.length - 1
          ) {
            io.to(answer.roomId).emit("gameOver");
          }
        }
      }
    );

    socket.on("cancell", (req: { roomId: string; userId: string }) => {
      console.log("on: server cancelled", req.roomId);
      io.emit("cancelled", req.roomId);
      socket.leave(req.roomId);
      const index = gameGroup.findIndex((g) => g.roomId === req.roomId);
      if (index !== -1) {
        const newUsers = gameGroup[index].participatedUsers.filter(
          (p) => p.userId !== req.userId
        );
        if (newUsers.length !== 0) {
          gameGroup[index].participatedUsers = newUsers;
          io.to(req.roomId).emit("roomStatus", {
            status: "someoneExit",
          });
        } else {
          gameGroup = gameGroup.filter((g) => g.roomId !== req.roomId);
        }
      }
    });

    socket.on("disconnect", (reason: string) => {
      console.log("サーバー側の切断イベント", socket.id);
      // roomの参加人数が0になると自動的にroomが破棄されるのでメモリ上のオブジェクトも同期する
      const keyList = Array.from(io.sockets.adapter.rooms.keys());
      const removeTargets: string[] = [];
      gameGroup.forEach((g) => {
        if (!keyList.includes(g.roomId)) {
          removeTargets.push(g.roomId);
        }
      });
      gameGroup = gameGroup.filter((g) => !removeTargets.includes(g.roomId));

      // ゲーム中だった場合は強制退出させる
      const targetRoom = gameGroup.find((r) =>
        Boolean(r.participatedUsers.find((u) => u.socketId === socket.id))
      );
      if (targetRoom) {
        targetRoom.participatedUsers = targetRoom.participatedUsers.filter(
          (u) => u.socketId !== socket.id
        );
      }
    });
  };

  io.removeAllListeners();
  io.on("connection", connectionHandler);

  expressApp.all("*", (req: NextApiRequest, res: any) => handle(req, res));
  server.listen(port);
});
