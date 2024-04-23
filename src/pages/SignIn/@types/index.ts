import { User } from '@/contexts/UserDate';

export type signInProps = {
  email: string;
  password: string;
};
export type getInfoUserProps = {
  accessToken: string;
  setUser: (userData: User) => void;
};
