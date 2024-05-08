import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type summaryExpenseType = {
  id: string;
  name: string;
  value: number;
};

export type expenseType = {
  id: string;
  name: string;
  value: number;
  sub_expenses: summaryExpenseType[];
};

export type subBillType = {
  id: string;
  name: string;
  total: number;
  expenses: expenseType[];
};

export type billType = {
  total: number;
  bills: subBillType[];
};

export type listBillsProps = {
  setDate: Dispatch<SetStateAction<billType>>;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};
export type handleProps = {
  id: string;
  name: string;
  idProject: string;
  navigate: NavigateFunction;
};
