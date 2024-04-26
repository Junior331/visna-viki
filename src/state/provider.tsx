import React from 'react';
import UserProvider from './user/state';
import { MenuProvider } from '@/contexts/Menu';
import { SnackbarProvider } from '@/contexts/Snackbar';
import { SearchProvider } from '@/contexts/Search';

type ProviderType = {
  children: React.ReactElement | React.ReactElement[];
};

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <UserProvider>
      <SnackbarProvider>
        <SearchProvider>
          <MenuProvider>{children}</MenuProvider>
        </SearchProvider>
      </SnackbarProvider>
    </UserProvider>
  );
};

export default Provider;
