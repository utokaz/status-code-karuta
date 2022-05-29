import { IconType } from "../feature/userRegister/components/IconCard";

export type User = {
  userId: string;
  name: string;
  iconType: IconType;
};

export const storageManager = {
  setUserOnStorage: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUserFromStorage: () => {
    if (typeof window !== "undefined") {
      const objc = localStorage.getItem("user");
      if (objc) {
        const user: User = JSON.parse(objc);
        return user;
      }
    }

    return null;
  },
};
