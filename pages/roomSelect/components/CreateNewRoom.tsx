import { useState } from "react";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { Toast } from "../../../components/Toast";
import styles from "../../../styles/CreateNewRoom.module.css";
import { ClipboardIcon } from "@heroicons/react/outline";

type CreateNewRoomProps = {
  newRoomID: string;
  cancellRoomHandler: () => void;
  roomLimitCount: number;
};

export const CreateNewRoom = ({
  cancellRoomHandler,
  newRoomID,
  roomLimitCount,
}: CreateNewRoomProps) => {
  const [toastIsOpen, setTostIsOpen] = useState(false);

  const onClickCopy = () => {
    setTostIsOpen(true);
    navigator.clipboard.writeText(newRoomID);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.phrase}>
          {`下記のIDでルームを作成しました。${roomLimitCount}人集まるとゲームが開始されます。人数が集まるまでお待ちください。`}
        </p>
        <p className={styles.phrase}>{newRoomID}</p>
        <PrimaryButton onClick={onClickCopy} className={styles.copy_button}>
          <ClipboardIcon className={styles.icon} />
          IDをコピーする
        </PrimaryButton>
        <PrimaryButton isSecondary onClick={cancellRoomHandler}>
          キャンセルする
        </PrimaryButton>
      </div>
      {toastIsOpen && (
        <Toast
          isShow={toastIsOpen}
          text="コピーしました"
          onClose={() => setTostIsOpen(false)}
        />
      )}
    </div>
  );
};
