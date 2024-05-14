import { rowData } from '@/components/modules/TableBody/@types';
import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';

export type costType = {
  id: number;
  name: string;
};
export type listCostsProps = {
  setList: Dispatch<SetStateAction<rowData[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
  setTypesCostOptions: Dispatch<SetStateAction<costType[]>>;
  setTypesExpenseOptions: Dispatch<SetStateAction<costType[]>>;
};
export type handleFilterProps = {
  list: rowData[];
  typesCost: string;
  nameExpense: string;
  typesExpense: string;
};
export type deleteItemListProps = {
  listCostsStorage: string | null;
  itemName: string;
};
