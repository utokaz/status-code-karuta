import { useRouter } from 'next/router';
import { PrimaryButton } from '../../../components/PrimaryButton';
import styles from '../../../styles/TrainingResultDialog.module.css';

type TrainingResultDialogProps = {
  getCardCount: number;
  wrongHitCount: number;
};

export const TrainingResultDialog = ({
  getCardCount,
  wrongHitCount,
}: TrainingResultDialogProps) => {
  const router = useRouter();

  const endButtonClicked = () => {
    router.replace('/roomSelect');
  };
  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <p className={styles.title}>結果発表</p>
        <div>
          <p>{`取り札${getCardCount}枚`}</p>
          <p>{`お手つき${wrongHitCount}枚`}</p>
          <PrimaryButton onClick={endButtonClicked}>終了</PrimaryButton>
        </div>
      </div>
    </div>
  );
};
