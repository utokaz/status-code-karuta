import { Question } from "../../dataSource/questions";

export type IconType =
  | "dolphin"
  | "dog"
  | "pig"
  | "unicorn"
  | "elephant"
  | "sushi"
  | "dinausor"
  | "thinking";

export type WaitingRoomsResponse = {
  rooms?: GameGroupType[];
};

export type QuestionsResponse = {
  questions: Question[];
  users: PlayingUser[];
};

export type GameGroupType = {
  roomId: string;
  roomLimit: number;
  participatedUsers: (PlayingUser & { socketId: string })[];
  questions: {
    questions: Question[];
    displayOrderQuestions: Question[];
    displayingQuestionPosition: number;
  };
  isStarted: boolean;
};

export type PlayingUser = {
  userId: string;
  userName: string;
  iconType: IconType;
  getCardCount: number;
  wrongHitCount: number;
};

export type GameStateNotification = {
  displayPosition: number;
  playingUsers: PlayingUser[];
  removeTarget: number | undefined;
};

export type RoomStatus =
  | "playing"
  | "ready"
  | "created"
  | "notFound"
  | "waiting";
