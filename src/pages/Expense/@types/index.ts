import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import { shallowCostType, incorporationFeeType } from '@/pages/Bills/@types';
import { costType } from '@/pages/ListBills/@types';
import { NavigateFunction } from 'react-router-dom';
import { payloadExpenseType } from '@/utils/types';

export type handleGenericProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};

export type listBillsProps = handleGenericProps & {
  id: number;
  setDate: Dispatch<SetStateAction<shallowCostType | incorporationFeeType>>;
};
export type listCostsProps = handleGenericProps & {
  setTypesCostOptions: Dispatch<SetStateAction<costType[]>>;
  setTypesExpenseOptions: Dispatch<SetStateAction<costType[]>>;
};

export type deleteExpenseProps = handleGenericProps & {
  id: number;
  navigate: NavigateFunction;
};
export type editExpenseProps = handleGenericProps & {
  id: number;
  navigate: NavigateFunction;
  expense: payloadExpenseType;
};
