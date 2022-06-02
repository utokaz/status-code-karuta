import { useEffect, useState } from "react";
import styles from "../styles/Toast.module.css";
type ToastProps = {
  isShow: boolean;
  text: string;
  onClose: () => void;
  type?: "negative" | "positive";
};

export const Toast = ({
  isShow,
  text,
  onClose,
  type = "positive",
}: ToastProps) => {
  const containerColor =
    type === "positive"
      ? styles.positive_container_color
      : styles.negative_container_color;
  useEffect(() => {
    const id = setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.container} ${containerColor}`}>
      <p>{text}</p>
    </div>
  );
};
