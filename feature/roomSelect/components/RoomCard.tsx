import { HTMLAttributes } from "react";
import { IconType, Icons } from "../../userRegister/components/IconCard";
import { PlayingUser } from "../../../server/types";
import styles from "../../../styles/RoomCard.module.css";
import { RoomCardUserIcon } from "./RoomCardUserIcon";

type RoomCardProps = {
  roomId: string;
  participatingUsers: PlayingUser[];
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
        {participatingUsers.map((user, i) => {
          return <RoomCardUserIcon key={i} user={user} />;
        })}
      </div>
    </div>
  );
};
