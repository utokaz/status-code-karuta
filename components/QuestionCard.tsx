import { useEffect, useState } from 'react';
import styles from '../styles/QuestionCard.module.css';

type QuestionCardProps = {
  questionText: string;
};

export const QuestionCard = ({ questionText }: QuestionCardProps) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
    // マウント時の処理
    const charItr = questionText[Symbol.iterator]();
    const id = setInterval(() => {
      const next = charItr.next();
      if (next.done) {
        clearTimeout(id);
        return;
      }
      setText((prev) => prev + next.value);
    }, 200);

    // アンマウント時に念のためタイマー解除
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionText]);
  return (
    <div className={styles.questionCard}>
      <p>{text}</p>
    </div>
  );
};
