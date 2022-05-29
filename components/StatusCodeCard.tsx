import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/StatusCodeCard.module.css';

type StatusCodeCardProps = {
  onSelected: (answeredID: number) => void;
  questionId: number;
  statusCode: string;
  statusName: string;
};

export const StatusCodeCard = ({
  statusCode,
  statusName,
  onSelected,
  questionId,
}: StatusCodeCardProps) => {
  const statusCodeColoring = () => {
    const firstChar = statusCode.split('')[0];
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
  statusCodeColoring();
  return (
    <div className={styles.container} onClick={() => onSelected(questionId)}>
      <p className={`${styles.p} ${statusCodeColoring()}`}>{statusCode}</p>
      <p className={`${styles.p} ${statusCodeColoring()}`}>{statusName}</p>
    </div>
  );
};
