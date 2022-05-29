import React, { createContext, useContext, useState } from 'react';
import { IconType } from '../pages/userRegister/components/IconCard';

type UserProviderProps = {
  children: React.ReactNode;
};

type User = {
  userId: string;
  name: string;
  iconType: IconType;
};

type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const context = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <context.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </context.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('useUser must be used whithin UserProvider');
  }
  return ctx;
};
