import styles from "../../../styles/IconCard.module.css";

export const Icons = {
  dolphin: "🐬",
  dog: "🐕",
  pig: "🐷",
  unicorn: "🦄",
  elephant: "🐘",
  sushi: "🍣",
  dinausor: "🦖",
  thinking: "🤔",
} as const;

export type IconType = keyof typeof Icons;

type IconCardProps = {
  type: keyof typeof Icons;
  isSelecting: boolean;
  onSelected: React.Dispatch<React.SetStateAction<keyof typeof Icons>>;
};

export const IconCard = ({ type, isSelecting, onSelected }: IconCardProps) => {
  const selectingStyle = isSelecting ? styles.selecting : "";
  return (
    <div
      className={`${styles.contaienr} ${selectingStyle}`}
      onClick={() => onSelected(type)}
    >
      <span className={styles.emoji}>{Icons[type]}</span>
    </div>
  );
};
