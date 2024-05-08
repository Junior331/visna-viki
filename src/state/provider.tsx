import React from 'react';
import UserProvider from './user/state';
import { MenuProvider } from '@/contexts/Menu';
import { SearchProvider } from '@/contexts/Search';
import { SnackbarProvider } from '@/contexts/Snackbar';
import { StepsIsDoneProvider } from '@/contexts/StepIsDone';

type ProviderType = {
  children: React.ReactElement | React.ReactElement[];
};

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <UserProvider>
      <SnackbarProvider>
        <SearchProvider>
          <StepsIsDoneProvider>
            <MenuProvider>{children}</MenuProvider>
          </StepsIsDoneProvider>
        </SearchProvider>
      </SnackbarProvider>
    </UserProvider>
  );
};

export default Provider;
