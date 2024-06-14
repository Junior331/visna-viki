import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Snackbar } from '@/contexts/Snackbar';

export type handleGenericProps = {
  name: string;
  projectId: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};

export type handleDeleteAporteProps = handleGenericProps & {
  id: number;
  navigate: NavigateFunction;
};
export type handleEditAporteProps = handleGenericProps & {
  id: number;
  payload: unknown;
  navigate: NavigateFunction;
};
