import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Snackbar } from '@/contexts/Snackbar';
import { projectInfoType } from '@/utils/types';

export type tabPanelProps = {
  value: number;
  index: number;
  children?: React.ReactNode;
};

export type handleTabsProps = {
  newValue: number;
  setValue: Dispatch<React.SetStateAction<number>>;
};
export type getInfoProjectProps = {
  id: number;
  setSnackbar: (snackbarData: Snackbar) => void;
  setDate: Dispatch<SetStateAction<projectInfoType>>;
};

export type handleDeleteProjectProps = {
  id: string;
  navigate: NavigateFunction;
  setSnackbar: (snackbarData: Snackbar) => void;
  setIsLoad: Dispatch<React.SetStateAction<boolean>>;
  setIsDelete: Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
};
