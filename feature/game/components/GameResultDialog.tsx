import { PrimaryButton } from "../../../components/PrimaryButton";

import styles from "../../../styles/GameResultDialog.module.css";
import { useRouter } from "next/router";
import { PlayingUser } from "../../../server/types";

type GameResultDialogProps = {
  playingUsers: PlayingUser[];
};

type UserWithScore = PlayingUser & { score: number; rank: number };

export const GameResultDialog = ({ playingUsers }: GameResultDialogProps) => {
  const router = useRouter();
  const orderUsersByScore = () => {
    const usersWithScore: UserWithScore[] = playingUsers.map((u) => {
      return { ...u, score: u.getCardCount - u.wrongHitCount, rank: -1 };
    });
    usersWithScore.sort((a, b) => b.score - a.score);
    const scoreList = Array.from(new Set(usersWithScore.map((u) => u.score)));
    scoreList.forEach((s, i) => {
      usersWithScore.forEach((u) => {
        if (u.score === s) {
          u.rank = i + 1;
        }
      });
    });

    return usersWithScore;
  };

  const endButtonClicked = () => {
    router.replace("/roomSelect");
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={styles.inner_container}>
          <p className={styles.title}>結果発表</p>
          {orderUsersByScore().map((u) => {
            return (
              <p className={styles.user_row} key={u.userId}>{`${u.rank}. ${
                u.userName
              } ${u.rank === 1 ? "🎉" : ""}`}</p>
            );
          })}
        </div>
        <PrimaryButton onClick={endButtonClicked}>終了</PrimaryButton>
      </div>
    </div>
  );
};
