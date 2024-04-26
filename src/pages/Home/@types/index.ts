import { Snackbar } from '@/contexts/Snackbar';
import { projectType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type listProjectsProps = {
  token: string;
  setSnackbar: (snackbarData: Snackbar) => void;
  setList: Dispatch<SetStateAction<projectType[]>>;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};
export type handleFilterAndSearchProps = {
  value?: string;
  option: string;
  list: projectType[];
  setContentActive?: (item: string) => void;
  setFilterList: Dispatch<SetStateAction<projectType[]>>;
};
export type handleChangeProjectProps = {
  id: string;
  name: string;
  navigate: NavigateFunction;
};
