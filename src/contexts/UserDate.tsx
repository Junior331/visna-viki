import { images } from '@/assets/images';
import { ReactNode, createContext, useMemo, useState } from 'react';

export type User = {
  id: string;
  role: string;
  email: string;
  avatar: string;
  username: string;
};

type UserContextType = {
  user: User;
  setUser: (userData: User) => void;
};

const initialState: User = {
  id: '',
  role: '',
  email: '',
  username: '',
  avatar: images.fallback
};

export const UserContext = createContext<UserContextType>({
  user: initialState,
  setUser: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initialState);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
