import { Icons } from "../../userRegister/components/IconCard";
import styles from "../../../styles/RoomCardUserIcon.module.css";
import { PlayingUser } from "../../../server/types";
import { useState } from "react";

type RoomCardUserIcon = {
  user: PlayingUser;
};

export const RoomCardUserIcon = ({ user }: RoomCardUserIcon) => {
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const onMouseEnter = () => {
    if (!toolTipOpen) {
      setToolTipOpen(true);
    }
  };

  const onMouseLeave = () => {
    if (toolTipOpen) {
      setToolTipOpen(false);
    }
  };
  return (
    <div
      className={styles.icon}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>{Icons[user.iconType]}</span>
      {toolTipOpen && <div className={styles.tool_tip}>{user.userName}</div>}
    </div>
  );
};
