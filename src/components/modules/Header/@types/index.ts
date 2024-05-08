import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Snackbar } from '@/contexts/Snackbar';
import { payloadUserType } from '@/utils/types';

export type handleLogoutProps = {
  navigate: NavigateFunction;
  setAnchorEl: Dispatch<React.SetStateAction<HTMLElement | null>>;
};
export type handleCreateUserProps = {
  values: payloadUserType;
  setSnackbar: (snackbarData: Snackbar) => void;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
};
