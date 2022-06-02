import styles from "../../styles/UserRegister.module.css";
import {
  IconCard,
  Icons,
} from "../../feature/userRegister/components/IconCard";
import { TextInput } from "../../components/TextInput";
import React, { useRef, useState } from "react";
import { MainLayout } from "../../components/MainLayout";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Toast } from "../../components/Toast";
import { createUniqueStr } from "../../utils/createUniqueStr";
import { useRouter } from "next/router";
import { storageManager } from "../../utils/storageManager";
import { useUser } from "../../provider/UserProvider";
import { CheckCircleIcon } from "@heroicons/react/outline";

const UserRegister = () => {
  const { user, setUser } = useUser();
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof Icons>(
    user?.iconType ?? "dolphin"
  );
  const [isToastShow, setIsToastShow] = useState(false);
  const router = useRouter();

  const onRegisterClicked = () => {
    if (textInputRef?.current?.value) {
      const user = {
        userId: createUniqueStr(),
        name: textInputRef.current.value,
        iconType: selectedIcon,
      };
      storageManager.setUserOnStorage(user);
      setUser(user);
      router.replace("/roomSelect");
    } else {
      setIsToastShow(true);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.user_name_container}>
        <p className={styles.user_name}>ユーザーネーム</p>
        <TextInput
          ref={textInputRef}
          className={styles.user_name_input}
          maxLength={20}
          defaultValue={user?.name}
        />
      </div>

      <div className={styles.icon_container}>
        {Object.keys(Icons).map((key) => {
          return (
            <IconCard
              key={key}
              type={key as keyof typeof Icons}
              isSelecting={key === selectedIcon}
              onSelected={setSelectedIcon}
            />
          );
        })}
      </div>
      <PrimaryButton
        onClick={onRegisterClicked}
        disabled={isToastShow}
        className={styles.button}
      >
        <CheckCircleIcon className={styles.button_icon} />
        ユーザー名登録
      </PrimaryButton>
      {isToastShow && (
        <Toast
          isShow={isToastShow}
          text={"ユーザーネームを入力してください"}
          onClose={() => setIsToastShow(false)}
          type={"negative"}
        />
      )}
    </div>
  );
};

UserRegister.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default UserRegister;
