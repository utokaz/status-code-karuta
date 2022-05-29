import { MainLayout } from "../../components/MainLayout";
import { NextPageWithLayout } from "../_app";
import styles from "../../styles/Training.module.css";
import { UserStatusRow } from "../../components/UserStatusRow";
import { StatusCodeCard } from "../../components/StatusCodeCard";
import { QuestionCard } from "../../components/QuestionCard";
import { useUser } from "../../provider/UserProvider";
import { GetServerSideProps } from "next";
import { Question } from "../../dataSource/questions";
import { TrainingResultDialog } from "./components/TrainingResultDialog";
import { Toast } from "../../components/Toast";
import { statusCodeClassfication } from "../../constants/statusCodeClassification";
import { useTraining } from "../../hooks/useTraining";
import { createQuestions } from "../../server/utils/createQuestions";

type TrainingProps = {
  questions?: Question[];
  displayOrderQuestions?: Question[];
};

const Training: NextPageWithLayout = ({
  questions,
  displayOrderQuestions,
}: TrainingProps) => {
  const { user } = useUser();

  const {
    displayingQuestion,
    isWrongCountToastOpen,
    resultDialogOpen,
    answer,
    allQuestion,
    setIsWrongCountToastOpen,
  } = useTraining(displayOrderQuestions, questions);

  const statusCodeColoring = () => {
    const firstChar =
      displayingQuestion.displayingQuestion?.statusCode.split("")[0];

    switch (firstChar) {
      case statusCodeClassfication.information:
        return styles.information;
      case statusCodeClassfication.success:
        return styles.success;
      case statusCodeClassfication.redirect:
        return styles.redirect;
      case statusCodeClassfication.clientError:
        return styles.client_error;
      case statusCodeClassfication.serverError:
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
              displayingQuestion.displayingQuestion?.questionText ?? ""
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
          userName={user?.name ?? ""}
          iconType={user?.iconType ?? "dolphin"}
          wrongHitCount={displayingQuestion.wrongHitCount}
          getCardCount={displayingQuestion.getCardCount}
        />
      </div>
      {resultDialogOpen && (
        <TrainingResultDialog
          getCardCount={displayingQuestion.getCardCount}
          wrongHitCount={displayingQuestion.wrongHitCount}
        />
      )}
      {isWrongCountToastOpen && (
        <Toast
          isShow={isWrongCountToastOpen}
          text="お手つき！"
          onClose={() => setIsWrongCountToastOpen(false)}
          type={"negative"}
        />
      )}
    </div>
  );
};

Training.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: createQuestions() };
};

export default Training;
