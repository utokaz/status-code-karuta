import { MainLayout } from '../../components/MainLayout';
import { NextPageWithLayout } from '../_app';
import styles from '../../styles/Training.module.css';
import { UserStatusRow } from '../../components/UserStatusRow';
import { StatusCodeCard } from '../../components/StatusCodeCard';
import { QuestionCard } from '../../components/QuestionCard';
import { useUser } from '../../provider/UserProvider';
import { GetServerSideProps } from 'next';
import { Question } from '../../dataSource/questions';
import { QuestionsResponse } from '../../server/types';
import { useState } from 'react';
import { TrainingResultDialog } from './components/TrainingResultDialog';

type TrainingProps = {
  questions?: Question[];
  displayOrderQuestions?: Question[];
};

type TrainingState = {
  displayPosition: number;
  displayingQuestion: Question | undefined;
  getCardCount: number;
  wrongHitCount: number;
};

const Training: NextPageWithLayout = ({
  questions,
  displayOrderQuestions,
}: TrainingProps) => {
  const { user } = useUser();

  const [displayingQuestion, setDisplayingQuestion] = useState<TrainingState>({
    displayPosition: 0,
    displayingQuestion: displayOrderQuestions
      ? displayOrderQuestions[0]
      : undefined,
    getCardCount: 0,
    wrongHitCount: 0,
  });
  const [allQuestion, setAllQuestions] = useState<Question[] | undefined>(
    questions
  );
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
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
      // お手つき
      setDisplayingQuestion((prev) => {
        return {
          ...prev,
          wrongHitCount: prev.wrongHitCount + 1,
        };
      });
    }
  };

  const statusCodeColoring = () => {
    const firstChar =
      displayingQuestion.displayingQuestion?.statusCode.split('')[0];
    switch (firstChar) {
      case '1':
        return styles.information;
      case '2':
        return styles.success;
      case '3':
        return styles.redirect;
      case '4':
        return styles.client_error;
      case '5':
        return styles.server_error;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.question_and_cards}>
        <div className={styles.question_container}>
          <p
            className={`${styles.question_counter} ${statusCodeColoring()}`}
          >{`${displayingQuestion.displayPosition + 1} / ${
            displayOrderQuestions?.length
          }`}</p>
          <QuestionCard
            questionText={
              displayingQuestion.displayingQuestion?.questionText ?? ''
            }
          />
        </div>
        {/** アニメーション参考https://codesandbox.io/s/animesiyonnojieshuo-qw9us?from-embed=&file=/src/App.tsx */}
        <div className={styles.card_container}>
          {allQuestion?.map((q) => {
            return (
              <StatusCodeCard
                key={q.questionId}
                statusCode={q.statusCode}
                statusName={q.statusName}
                onSelected={answer}
                questionId={q.questionId}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.user_status_container}>
        <UserStatusRow
          userName={user?.name ?? ''}
          iconType={user?.iconType ?? 'dolphin'}
          wrongHitCount={displayingQuestion.wrongHitCount}
          getCardCount={displayingQuestion.getCardCount}
          isTraining
        />
      </div>
      {resultDialogOpen && (
        <TrainingResultDialog
          getCardCount={displayingQuestion.getCardCount}
          wrongHitCount={displayingQuestion.wrongHitCount}
        />
      )}
    </div>
  );
};

Training.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response: QuestionsResponse = await fetch(
      'http://localhost:3000/trainingQuestions'
    ).then((res) => res.json());
    return { props: response };
  } catch (error) {
    return { props: {} };
  }
};

export default Training;
