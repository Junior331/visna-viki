/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useMemo, useReducer } from 'react';
import { UserProviderType } from './@types';
import userReducer from './reducer';
import { images } from '@/assets/images';

const initialState: any = {
  user: {
    id: '',
    role: '',
    email: '',
    username: '',
    avatar: images.fallback
  }
};

export const UserContext = createContext(initialState);

const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UserContext.Provider value={provider}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
