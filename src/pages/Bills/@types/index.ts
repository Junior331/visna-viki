import { rowData } from '@/components/modules/TableBody/@types';
import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type expenseType = {
  id: number;
  name: string;
};
export type genericObjType = {
  id: number;
  name: string;
  expenses: expenseType[];
};
export type genericV2ObjType = {
  id: number;
  name: string;
  total: string;
  rows: rowData[];
  expenses: expenseType[];
};
export type shallowCostType = {
  id: number;
  name: string;
  land: genericObjType;
  project: genericObjType;
  Licenses: genericObjType;
  constructions: genericObjType;
  AdministrativeCosts: genericObjType;
};
export type incorporationFeeType = {
  id: number;
  name: string;
  administrateTax: genericObjType;
};
export type costsType = {
  costs: {
    shallowCost: shallowCostType;
    incorporationFee: incorporationFeeType;
  };
};
export type listBillsProps = {
  setDate: Dispatch<SetStateAction<costsType>>;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};
export type handleProps = {
  id: number;
  name: string;
  idProject: string;
  navigate: NavigateFunction;
  cost: shallowCostType | incorporationFeeType;
};
