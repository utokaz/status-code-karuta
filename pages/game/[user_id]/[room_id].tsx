import type { GetServerSideProps } from 'next';
import { QuestionCard } from '../../../components/QuestionCard';
import { StatusCodeCard } from '../../../components/StatusCodeCard';
import styles from '../../../styles/Game.module.css';
import { UserStatusRow } from '../../../components/UserStatusRow';
import { useRouter } from 'next/router';
import { MainLayout } from '../../../components/MainLayout';
import { NextPageWithLayout } from '../../_app';
import { Question } from '../../../dataSource/questions';
import { PlayingUser, QuestionsResponse } from '../../../server/types';
import { GameResultDialog } from '../components/GameResultDialog';
import { Toast } from '../../../components/Toast';
import { useGame } from '../../../hooks/useGame';

type GameProps = {
  // 表示するステータスコードカードのリスト
  questions?: Question[];
  // 出題される問題のリスト
  displayOrderQuestions?: Question[];

  playingUsers?: PlayingUser[];
};

const Game: NextPageWithLayout = ({
  questions,
  displayOrderQuestions,
  playingUsers,
}: GameProps) => {
  const router = useRouter();
  const { room_id, user_id } = router.query;
  const {
    gameState,
    answer,
    isWrongCountToastOpen,
    setIsWrongCountToastOpen,
    resultDialogOpen,
  } = useGame(String(room_id), String(user_id), {
    questions,
    displayOrderQuestions,
    playingUsers,
  });
  const statusCodeColoring = () => {
    if (gameState.displayingQuestion === undefined) {
      return '';
    }
    const [firstChar] = gameState.displayingQuestion.statusCode.split('');
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
          >{`${gameState.displayPosition + 1} / ${
            displayOrderQuestions?.length
          }`}</p>
          <QuestionCard
            questionText={gameState.displayingQuestion?.questionText ?? ''}
          />
        </div>
        {/** アニメーション参考https://codesandbox.io/s/animesiyonnojieshuo-qw9us?from-embed=&file=/src/App.tsx */}
        <div className={styles.card_container}>
          {gameState.allQuestions?.map((q) => {
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
      <div className={styles.horizontal_border} />
      <div className={styles.user_status_container}>
        {gameState.playingUsers.map((u) => {
          return (
            <UserStatusRow
              key={u.userId}
              userName={u.userName}
              iconType={u.iconType}
              getCardCount={u.getCardCount}
              wrongHitCount={u.wrongHitCount}
            />
          );
        })}
      </div>
      {resultDialogOpen && (
        <GameResultDialog playingUsers={gameState.playingUsers} />
      )}
      {isWrongCountToastOpen && (
        <Toast
          isShow={isWrongCountToastOpen}
          text="お手つき！"
          onClose={() => setIsWrongCountToastOpen(false)}
          type={'negative'}
        />
      )}
    </div>
  );
};

Game.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { room_id, user_id } = context.query;
  try {
    const response: QuestionsResponse & { playingUsers: PlayingUser[] } =
      await fetch(`http://localhost:3000/questions/${user_id}/${room_id}`).then(
        (res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error();
          }
        }
      );
    return { props: response };
  } catch (e) {
    context.res.writeHead(302, { Location: '/roomSelect' });
    context.res.end();
    return {
      props: {},
    };
  }
};

export default Game;
