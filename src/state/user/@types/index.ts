import { ReactElement } from 'react';

export type User = {
  id: string;
  role: string;
  email: string;
  avatar: string;
  username: string;
};

export type State = {
  user: User;
};

export type UserProviderType = {
  children: ReactElement | ReactElement[];
};
