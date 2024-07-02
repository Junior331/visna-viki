import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type breadCrumbsItemsProps = {
  id: string;
  name: string;
};
export type aportesProps = {
  id?: number;
  date: string;
  total: number;
  payment: number;
  expenses: number;
  projectId: number;
  investment: number;
  observation: string;
};

export type accumulator = {
  total: number;
  payment: number;
  expenses: number;
  investment: number;
};

export type handleGenericProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};
export type createNewAporteProps = handleGenericProps & {
  payload: aportesProps;
  setOpenModalNewAporte: Dispatch<SetStateAction<boolean>>;
};
export type listAportesProps = handleGenericProps & {
  id: number;
  page: number;
  perPage: number;
  setPageTotal: Dispatch<SetStateAction<number>>;
  setList: Dispatch<SetStateAction<aportesProps[]>>;
  setAccumulator: Dispatch<SetStateAction<accumulator>>;
};
export type handleSumValuesProps = {
  value1: string;
  value2: string;
  fieldName: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
};
export type handleEditAporteProps = {
  id: string;
  name: string;
  aporte: aportesProps;
  navigate: NavigateFunction;
};
