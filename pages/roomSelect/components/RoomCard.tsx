import { HTMLAttributes } from "react";
import {
  IconType,
  Icons,
} from "../../../pages/userRegister/components/IconCard";
import styles from "../../../styles/RoomCard.module.css";

type RoomCardProps = {
  roomId: string;
  participatingUsers: IconType[];
  onSelected: () => void;
  roomLimit: number;
};

export const RoomCard = ({
  roomId,
  participatingUsers,
  onSelected,
  roomLimit,
}: RoomCardProps) => {
  return (
    <div className={styles.container} onClick={onSelected}>
      <p className={styles.room_id_phrase}>{`room id: ${roomId}`}</p>
      <span className={styles.room_limit_badge}>{`${roomLimit}人対戦`}</span>
      <div className={styles.icons_container}>
        {participatingUsers.map((u, i) => {
          return (
            <div key={i} className={styles.icon}>
              <span>{Icons[u]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
