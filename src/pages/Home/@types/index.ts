import { Snackbar } from '@/contexts/Snackbar';
import { projectType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type listProjectsProps = {
  page: number;
  limit?: number;
  setSnackbar: (snackbarData: Snackbar) => void;
  setList: Dispatch<SetStateAction<projectType[]>>;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  setTotalPage: Dispatch<React.SetStateAction<number>>;
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
export type handleChangePageProps = {
  newPage: number;
  setPage: Dispatch<React.SetStateAction<number>>;
};
