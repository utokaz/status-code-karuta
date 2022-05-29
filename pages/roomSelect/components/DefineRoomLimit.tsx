import React, { ChangeEvent, useState } from "react";
import { PrimaryButton } from "../../../components/PrimaryButton";
import styles from "../../../styles/DefineRoomLimit.module.css";

type DefineRoomLimitProps = {
  onDecideLimit: (limit: number) => void;
  onCancellDecideLimit: () => void;
};

export const DefineRoomLimit = ({
  onDecideLimit,
  onCancellDecideLimit,
}: DefineRoomLimitProps) => {
  const [roomLimit, setRoomLimit] = useState<number>(2);

  const onLiimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    if (value < 2 || value > 4 || isNaN(value)) {
      return;
    }
    setRoomLimit(value);
  };

  const increment = () => {
    setRoomLimit((prev) => {
      if (prev >= 4) {
        return prev;
      }
      return prev + 1;
    });
  };

  const decrement = () => {
    setRoomLimit((prev) => {
      if (prev <= 2) {
        return prev;
      }
      return prev - 1;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>参加人数を決めてください</p>
        <div className={styles.limint_input}>
          <button className={styles.number_control} onClick={increment}>+</button>
          <input
            onChange={onLiimitChange}
            value={roomLimit}
            className={styles.number_input}
          />
          <button className={styles.number_control} onClick={decrement}>-</button>
        </div>
        <p className={styles.exp}>2〜4人で設定してください</p>
        <PrimaryButton onClick={() => onDecideLimit(roomLimit)}>
          決定
        </PrimaryButton>
        <PrimaryButton isSecondary onClick={onCancellDecideLimit}>
          キャンセル
        </PrimaryButton>
      </div>
    </div>
  );
};
