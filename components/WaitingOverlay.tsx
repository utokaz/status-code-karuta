import styles from "../styles/WaitingOverlay.module.css";
import { XIcon } from "@heroicons/react/outline";

type WaitingOverlayProps = {
  closeButtonClicked: () => void;
};

export const WaitingOverlay = ({ closeButtonClicked }: WaitingOverlayProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.exp_phrase}>参加者が集まるとゲームが始まります...</p>
      <button className={styles.close_button} onClick={closeButtonClicked}>
        <XIcon className={styles.close} />
      </button>
    </div>
  );
};
