import images from '@/assets/images';
import { ReactNode, createContext, useMemo, useState } from 'react';

type User = {
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

const defaultUser: User = {
  id: '',
  role: 'Admin',
  email: 'test@gmail.com',
  avatar: images.DefaultAvatar,
  username: 'John Doe'
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
