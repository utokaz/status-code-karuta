import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type WSProviderProps = {
  children: React.ReactNode;
};

const context = createContext<{
  ws: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>;
} | null>(null);

export const WSProvider = ({ children }: WSProviderProps) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );
  useEffect(() => {
    if (socketRef.current === null) {
      socketRef.current = io("/");
      console.log("connected", socketRef.current);
    }
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <context.Provider value={{ ws: socketRef }}>{children}</context.Provider>
  );
};

export const useWS = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error("useWS must be used whithin WSProvider");
  }
  return ctx;
};
