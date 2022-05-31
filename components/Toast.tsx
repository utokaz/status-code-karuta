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
  const [isLifeTimeLeft, setIsLifeTimeLeft] = useState(true);
  const containerColor =
    type === "positive"
      ? styles.positive_container_color
      : styles.negative_container_color;
  useEffect(() => {
    setIsLifeTimeLeft(true);
    const id = setTimeout(() => {
      setIsLifeTimeLeft(false);
      onClose();
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, [onClose]);

  return (
    <div className={`${styles.container} ${containerColor}`}>
      <p>{text}</p>
    </div>
  );
};
