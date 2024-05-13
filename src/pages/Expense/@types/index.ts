import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import { shallowCostType, incorporationFeeType } from '@/pages/Bills/@types';
import { costType } from '@/pages/ListBills/@types';

export type listBillsProps = {
  id: number;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<shallowCostType | incorporationFeeType>>;
};
export type listCostsProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
  setTypesCostOptions: Dispatch<SetStateAction<costType[]>>;
  setTypesExpenseOptions: Dispatch<SetStateAction<costType[]>>;
};
