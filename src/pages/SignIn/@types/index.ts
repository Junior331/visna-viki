import { User } from '@/contexts/UserDate';

export type signInProps = {
  email: string;
  password: string;
};
export type getInfoUserProps = {
  setUser: (userData: User) => void;
};
