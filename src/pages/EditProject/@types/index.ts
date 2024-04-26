import { Snackbar } from '@/contexts/Snackbar';
import { projectInfoType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';

export type handleTabsProps = {
  newValue: number;
  setValue: Dispatch<React.SetStateAction<number>>;
};
export type getInfoProjectProps = {
  id: number;
  setSnackbar: (snackbarData: Snackbar) => void;
  setDate: Dispatch<SetStateAction<projectInfoType>>;
};
