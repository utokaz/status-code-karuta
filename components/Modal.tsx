import React, { MouseEvent } from 'react';
import styles from '../styles/Modal.module.css';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ onClose, children }: ModalProps) => {
  const onClickContainer = () => {
    onClose();
  };

  const onClickDialog = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.container} onClick={onClickContainer}>
      <div className={styles.dialog} onClick={onClickDialog}>
        {children}
      </div>
    </div>
  );
};
