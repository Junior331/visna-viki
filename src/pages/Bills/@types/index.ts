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
  totalValue: number;
  expenses: expenseType[];
};
export type genericV2ObjType = {
  id: number;
  type: string;
  name: string;
  rows: rowData[];
  totalValue: number;
  expenses: expenseType[];
};
export type shallowCostType = {
  id: number;
  name: string;
  totalValue: number;
  land: genericObjType;
  project: genericObjType;
  Licenses: genericObjType;
  constructions: genericObjType;
  AdministrativeCosts: genericObjType;
};
export type incorporationFeeType = {
  id: number;
  name: string;
  totalValue: number;
  administrateTax: genericObjType;
};
export type costsType = {
  costs: {
    shallowCost: shallowCostType;
    incorporationFee: incorporationFeeType;
  };
};
export type costsTypeV2 = {
  costs: {
    totalValue: number;
    shallowCost: shallowCostType;
    incorporationFee: incorporationFeeType;
  };
};
export type listCostsProps = {
  id: number;
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
