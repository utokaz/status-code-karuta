import { PrimaryButton } from '../../../components/PrimaryButton';
import { PlayingUser } from '../../../server';
import styles from '../../../styles/GameResultDialog.module.css';
import { useRouter } from 'next/router';

type GameResultDialogProps = {
  playingUsers: PlayingUser[];
};

export const GameResultDialog = ({ playingUsers }: GameResultDialogProps) => {
  const router = useRouter();
  const orderUsersByScore = () => {
    const clone = [...playingUsers];
    clone.sort((a, b) => {
      return (
        b.getCardCount - b.wrongHitCount - (a.getCardCount - a.wrongHitCount)
      );
    });
    return clone;
  };

  const endButtonClicked = () => {
    router.replace('/roomSelect');
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={styles.inner_container}>
          <p className={styles.title}>結果発表</p>
          {orderUsersByScore().map((u, i) => {
            return (
              <p className={styles.user_row} key={u.userId}>{`${i + 1}. ${
                u.userName
              } ${i === 0 ? '🎉' : ''}`}</p>
            );
          })}
        </div>
        <PrimaryButton onClick={endButtonClicked}>終了</PrimaryButton>
      </div>
    </div>
  );
};
