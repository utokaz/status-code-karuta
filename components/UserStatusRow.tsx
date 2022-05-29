import styles from "../styles/UserStatusRow.module.css";
import { Icons, IconType } from "../pages/userRegister/components/IconCard";
import { useEffect, useRef } from "react";

type UserStatusRowProps = {
  userName: string;
  iconType: IconType;
  getCardCount: number;
  wrongHitCount: number;
};

export const UserStatusRow = ({
  userName,
  iconType,
  getCardCount,
  wrongHitCount,
}: UserStatusRowProps) => {
  const emojiRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    let timer: NodeJS.Timer;
    if (emojiRef.current) {
      emojiRef.current.classList.add(styles.emoji_anim);
      timer = setTimeout(() => {
        if (emojiRef.current) {
          emojiRef.current.classList.remove(styles.emoji_anim);
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [getCardCount]);
  return (
    <div className={styles.container}>
      <div className={styles.emoji_container}>
        {iconType && (
          <span className={styles.emoji} ref={emojiRef}>
            {Icons[iconType]}
          </span>
        )}
      </div>
      <p className={styles.user_name}>{userName}</p>
      <div className={styles.card_status}>
        <p>お手つき</p>
        <p>{`${wrongHitCount}回`}</p>
      </div>
      <div className={styles.card_status}>
        <p>取り札</p>
        <p>{`${getCardCount}枚`}</p>
      </div>
    </div>
  );
};
