import React from 'react';
import { MenuProvider } from '@/contexts/Menu';
import { UserProvider } from '@/contexts/UserDate';
import { SnackbarProvider } from '@/contexts/Snackbar';

type ProviderType = {
  children: React.ReactElement | React.ReactElement[];
};

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <UserProvider>
      <SnackbarProvider>
        <MenuProvider>{children}</MenuProvider>
      </SnackbarProvider>
    </UserProvider>
  );
};

export default Provider;
