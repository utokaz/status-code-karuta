import React, { useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/MainLayout";
import { NextPageWithLayout } from "../_app";
import styles from "../../styles/RoomSelect.module.css";
import { GetServerSideProps } from "next";
import { RoomCard } from "./components/RoomCard";
import { PrimaryButton } from "../../components/PrimaryButton";
import { WaitingRoomsResponse, RoomStatus } from "../../server/types";
import { useWS } from "../../provider/WSProvider";
import { WaitingOverlay } from "../../components/WaitingOverlay";
import { useRouter } from "next/router";
import { Modal } from "../../components/Modal";
import { CreateNewRoom } from "./components/CreateNewRoom";
import { useUser } from "../../provider/UserProvider";
import { createUniqueStr } from "../../utils/createUniqueStr";
import { DefineRoomLimit } from "./components/DefineRoomLimit";
import { PlusIcon, PencilIcon } from "@heroicons/react/outline";

const RoomSelect: NextPageWithLayout = ({ rooms }: WaitingRoomsResponse) => {
  const [roomState, setRoomState] = useState(rooms);
  const { ws } = useWS();
  const { user } = useUser();
  const router = useRouter();
  const selectingRoomId = useRef("");
  const limitRoomCount = useRef<number>();
  const [isSorryModalOpen, setIsSorryModalOpen] = useState<
    "playing" | "notFound" | "none"
  >("none");
  const [roomLimitSelectOpen, setRoomSelectLimitOpen] = useState(false);

  const [selectedRoomStatus, setSelectedRoomStatus] =
    useState<RoomStatus | null>(null);
  const [isCreateNewRoomShow, setIsCreateNewRoomShow] = useState(false);

  const fetchRoomsStatus = async () => {
    try {
      const res: WaitingRoomsResponse = await fetch(
        `http://localhost:3000/waitingRooms`
      ).then((res) => {
        return res.json();
      });
      setRoomState(res.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const clone = ws.current;
    if (!user) {
      return;
    }
    ws.current?.removeListener("roomStatus");
    ws.current?.on(
      "roomStatus",
      (res: { status: RoomStatus; participantCount: number }) => {
        console.log(res.status);
        switch (res.status) {
          case "ready":
            router.replace(`/game/${user.userId}/${selectingRoomId.current}`);
            break;
          case "playing":
            setIsSorryModalOpen("playing");
            fetchRoomsStatus();
            break;
          case "waiting":
            if (!isCreateNewRoomShow) {
              setSelectedRoomStatus("waiting");
            }
            fetchRoomsStatus();
            break;
          case "created":
            fetchRoomsStatus();
            break;
          case "notFound":
            setIsSorryModalOpen("notFound");
            fetchRoomsStatus();
            break;
          default:
            const _: never = res.status;
        }
      }
    );
    return () => {
      clone?.removeListener("roomStatus");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateNewRoomShow, user]);

  const onSelectedRoom = (roomId: string) => {
    selectingRoomId.current = roomId;
    ws?.current?.emit("join", {
      roomId: roomId,
      userId: user?.userId,
      icon: user?.iconType,
      userName: user?.name,
    });
  };

  const onClickCancellRoom = () => {
    if (confirm("退出してよろしいですか？")) {
      ws?.current?.emit("cancell", {
        roomId: selectingRoomId.current,
        userId: user?.userId,
      });
      setIsCreateNewRoomShow(false);
      setSelectedRoomStatus(null);
      fetchRoomsStatus();
    }
  };

  const createNewRoom = (limit: number) => {
    setRoomSelectLimitOpen(false);
    console.log(limit);
    const newID = createUniqueStr();
    limitRoomCount.current = limit;
    selectingRoomId.current = newID;
    ws?.current?.emit("createRoom", {
      roomId: newID,
      userId: user?.userId,
      icon: user?.iconType,
      userName: user?.name,
      roomLimit: limit,
    });
    setIsCreateNewRoomShow(true);
  };
  const onClickTraining = () => {
    router.push("/training");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.button_container}>
          <PrimaryButton
            className={styles.button}
            onClick={() => setRoomSelectLimitOpen(true)}
          >
            <PlusIcon className={styles.icon} />
            新しくルームを作成する
          </PrimaryButton>
          <PrimaryButton className={styles.button} onClick={onClickTraining}>
            <PencilIcon className={styles.icon} />
            練習する
          </PrimaryButton>
        </div>
        <div className={styles.waiting_room_container}>
          <p className={styles.waiting_room_phrase}>Room List</p>
          {roomState?.map((r, i) => {
            return (
              <RoomCard
                key={i}
                roomId={r.roomId}
                participatingUsers={r.participatedUsers}
                onSelected={() => onSelectedRoom(r.roomId)}
                roomLimit={r.roomLimit}
              />
            );
          })}
        </div>
      </div>
      {selectedRoomStatus === "waiting" && (
        <WaitingOverlay closeButtonClicked={onClickCancellRoom} />
      )}
      {isSorryModalOpen !== "none" && (
        <Modal
          onClose={() => {
            setIsSorryModalOpen("none");
          }}
        >
          <p className={styles.sorry_phrase}>
            {isSorryModalOpen === "playing"
              ? "このルームはすでにゲームが始まっています。"
              : "該当のルームが見つかりませんでした。"}
          </p>
        </Modal>
      )}
      {isCreateNewRoomShow && limitRoomCount.current && (
        <CreateNewRoom
          cancellRoomHandler={onClickCancellRoom}
          newRoomID={selectingRoomId.current}
          roomLimitCount={limitRoomCount.current}
        />
      )}
      {roomLimitSelectOpen && (
        <DefineRoomLimit
          onDecideLimit={(num) => createNewRoom(num)}
          onCancellDecideLimit={() => setRoomSelectLimitOpen(false)}
        />
      )}
    </div>
  );
};

RoomSelect.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default RoomSelect;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res: WaitingRoomsResponse = await fetch(
      `http://localhost:3000/waitingRooms`
    ).then((res) => res.json());

    return { props: res };
  } catch (error) {
    return { props: {} };
  }
};
