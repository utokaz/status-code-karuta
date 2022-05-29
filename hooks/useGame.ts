import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Question } from '../dataSource/questions';
import { useWS } from '../provider/WSProvider';
import { GameStateNotification, PlayingUser } from '../server/types';

type GameState = {
  displayPosition: number;
  displayingQuestion: Question | undefined;
  playingUsers: PlayingUser[];
  allQuestions: Question[] | undefined;
};

export const useGame: (
  roomID: string,
  userID: string,
  gameProps: {
    questions?: Question[];
    // 出題される問題のリスト
    displayOrderQuestions?: Question[];

    playingUsers?: PlayingUser[];
  }
) => {
  gameState: GameState;
  answer: (answerID: number) => void;
  isWrongCountToastOpen: boolean;
  setIsWrongCountToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resultDialogOpen: boolean;
} = (roomID, userID, { questions, displayOrderQuestions, playingUsers }) => {
  const { ws } = useWS();
  const router = useRouter();
  const [resultDialogOpen, setDialogOpen] = useState(false);
  const [isWrongCountToastOpen, setIsWrongCountToastOpen] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    displayPosition: 0,
    displayingQuestion: displayOrderQuestions
      ? displayOrderQuestions[0]
      : undefined,
    playingUsers: playingUsers ? playingUsers : [],
    allQuestions: questions,
  });
  useEffect(() => {
    const clone = ws.current;
    ws.current?.on(
      'update',
      ({ gameStatus }: { gameStatus: GameStateNotification }) => {
        if (displayOrderQuestions && displayOrderQuestions.length > 0) {
          const next = displayOrderQuestions[gameStatus.displayPosition];
          setGameState((prev) => {
            const target = gameStatus.playingUsers.find(
              (u) => u.userId === userID
            );
            const current = prev.playingUsers.find((u) => u.userId === userID);
            if (
              target &&
              current &&
              target.wrongHitCount > current.wrongHitCount
            ) {
              setIsWrongCountToastOpen(true);
            }
            const rest = prev.allQuestions?.filter(
              (q) => q.questionId !== gameStatus.removeTarget
            );
            return {
              displayingQuestion:
                prev.displayPosition !== gameStatus.displayPosition
                  ? next
                  : prev.displayingQuestion,
              displayPosition: gameStatus.displayPosition,
              playingUsers: gameStatus.playingUsers,
              allQuestions: rest,
            };
          });
        }
      }
    );
    ws.current?.on('gameOver', () => {
      setDialogOpen(true);
    });

    router.events.on('routeChangeStart', handleChangeRoute);

    return () => {
      clone?.removeListener('update');
      clone?.removeListener('gameOver');
      router.events.off('routeChangeStart', handleChangeRoute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answer = (answerID: number) => {
    ws?.current?.emit('answer', {
      answerID: answerID,
      userId: userID,
      roomId: roomID,
      displayingPosition: gameState.displayPosition,
    });
  };

  const handleChangeRoute = () => {
    console.log('clien side cancell');
    ws.current?.emit('cancell', {
      roomId: roomID,
      userId: userID,
    });
  };
  return {
    gameState,
    answer,
    isWrongCountToastOpen,
    setIsWrongCountToastOpen,
    resultDialogOpen,
  };
};
