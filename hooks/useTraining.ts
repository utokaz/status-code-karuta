import { useState } from "react";
import { Question } from "../dataSource/questions";

type TrainingState = {
  displayPosition: number;
  displayingQuestion: Question | undefined;
  getCardCount: number;
  wrongHitCount: number;
};

export const useTraining = (
  displayOrderQuestions: Question[] | undefined,
  questions: Question[] | undefined
) => {
  const [displayingQuestion, setDisplayingQuestion] = useState<TrainingState>({
    displayPosition: 0,
    displayingQuestion: displayOrderQuestions
      ? displayOrderQuestions[0]
      : undefined,
    getCardCount: 0,
    wrongHitCount: 0,
  });
  const [isWrongCountToastOpen, setIsWrongCountToastOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [allQuestion, setAllQuestions] = useState<Question[] | undefined>(
    questions
  );
  const answer = (answerID: number) => {
    // 正解
    if (displayingQuestion.displayingQuestion?.questionId === answerID) {
      setDisplayingQuestion((prev) => {
        const newIndex = prev.displayPosition + 1;
        return {
          ...prev,
          displayPosition: newIndex,
          displayingQuestion: displayOrderQuestions
            ? displayOrderQuestions[newIndex]
            : undefined,
          getCardCount: prev.getCardCount + 1,
        };
      });
      const restCards = allQuestion?.filter((q) => {
        return q.questionId !== answerID;
      });
      setAllQuestions(restCards);
      if (restCards?.length === 0) {
        setResultDialogOpen(true);
      }
    } else {
      setIsWrongCountToastOpen(true);
      // お手つき
      setDisplayingQuestion((prev) => {
        return {
          ...prev,
          wrongHitCount: prev.wrongHitCount + 1,
        };
      });
    }
  };
  return {
    displayingQuestion,
    isWrongCountToastOpen,
    resultDialogOpen,
    answer,
    allQuestion,
    setIsWrongCountToastOpen,
  };
};
