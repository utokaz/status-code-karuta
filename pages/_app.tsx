import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../provider/UserProvider";
import { WSProvider } from "../provider/WSProvider";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { storageManager } from "../utils/storageManager";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsLayout) {
  const setLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const storedUser = storageManager.getUserFromStorage();

  useEffect(() => {
    if (storedUser === null) {
      // ユーザー登録していないユーザーのアクセスを制御する
      if (router.asPath !== "/" && router.asPath !== "/userRegister")
        router.replace("/");
    }
  }, [router, storedUser]);

  return (
    <WSProvider>
      <UserProvider>{setLayout(<Component {...pageProps} />)}</UserProvider>
    </WSProvider>
  );
}

export default MyApp;
