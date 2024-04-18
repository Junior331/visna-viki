import React from 'react';
import { MenuProvider } from '@/contexts/Menu';
import { UserProvider } from '@/contexts/UserDate';

type ProviderType = {
  children: React.ReactElement | React.ReactElement[];
};

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <UserProvider>
      <MenuProvider>{children}</MenuProvider>
    </UserProvider>
  );
};

export default Provider;
