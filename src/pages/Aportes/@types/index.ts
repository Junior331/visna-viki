import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';

export type breadCrumbsItemsProps = {
  id: string;
  name: string;
};
export type aportesProps = {
  id: number;
  date: string;
  total: number;
  payment: number;
  expenses: number;
  projectId: number;
  observation: string;
};
export type handleGenericProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};
export type listAportesProps = handleGenericProps & {
  id: number;
  page: number;
  perPage: number;
  setPageTotal: Dispatch<SetStateAction<number>>;
  setList: Dispatch<SetStateAction<aportesProps[]>>;
};
