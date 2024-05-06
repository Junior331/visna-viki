import { Dispatch, MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Snackbar } from '@/contexts/Snackbar';
import { payloadUserType } from '@/utils/types';

export type handleProps = {
  setAnchorEl: Dispatch<React.SetStateAction<HTMLElement | null>>;
};
export type handleClickProps = handleProps & {
  event: MouseEvent<HTMLElement>;
};
export type handleLogoutProps = handleProps & {
  navigate: NavigateFunction;
};
export type handleCreateUserProps = {
  values: payloadUserType;
  setSnackbar: (snackbarData: Snackbar) => void;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
};
