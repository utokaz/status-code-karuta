import styles from "../styles/MainLayout.module.css";
import { Icons } from "../feature/userRegister/components/IconCard";
import { storageManager } from "../utils/storageManager";
import { useEffect, useState } from "react";
import { useUser } from "../provider/UserProvider";
import { Footer } from "./Footer";
import Link from "next/link";

type MainLayoutProps = {
  children: React.ReactNode;
};

const UserMenu = () => {
  return (
    <div
      className={styles.menu_container}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className={styles.triangle}></div>
      <Link href={"/userRegister"}>
        <a className={styles.menu_link}>編集する</a>
      </Link>
    </div>
  );
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, setUser } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  useEffect(() => {
    const storedUser = storageManager.getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (userMenuOpen) {
          setUserMenuOpen(false);
        }
      }}
    >
      <header className={styles.header}>
        <Link href={"/roomSelect"}>
          <a className={styles.title}>Status Code Karuta</a>
        </Link>
        <div className={styles.spacer} />
        {user && (
          <div className={styles.emoji_container}>
            <span
              className={styles.emoji}
              onClick={() => setUserMenuOpen((prev) => !prev)}
            >
              {Icons[user.iconType]}
            </span>
          </div>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      {userMenuOpen && <UserMenu />}
      <Footer />
    </div>
  );
};
