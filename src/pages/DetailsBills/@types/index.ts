/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import { shallowCostType, incorporationFeeType } from '@/pages/Bills/@types';
import { payloadExpense } from '@/utils/types';
import { expense } from '@/pages/ListBills/@types';

export type handleGenericProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};

export type listBillsProps = handleGenericProps & {
  idProject: string;
  item: shallowCostType | incorporationFeeType;
  setDate: Dispatch<SetStateAction<shallowCostType | incorporationFeeType>>;
};

export type handleEditProps = {
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
};
export type row = {
  name: string;
  typeUnit: string;
  quantity: string;
  unitValue: string;
  totalValue: string;
};
export type initialState = {
  land: {
    id: number;
    name: string;
    rows: row[];
  };
  project: {
    id: number;
    name: string;
    rows: row[];
  };
  constructions: {
    id: number;
    name: string;
    rows: row[];
  };
  Licenses: {
    id: number;
    name: string;
    rows: row[];
  };
  AdministrativeCosts: {
    id: number;
    name: string;
    rows: row[];
  };
};
export type rowsDataType = {
  name: string;
  expenseId: number;
  typesIdCost: number;
  typesIdExpense: number;
};
export type expenseType = {
  id: string;
  name: string;
  expenses: expense[];
};

export type handleSumTotalValueProps = {
  value1: string;
  value2: string;
  fieldName: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};
export type createNewCostProps = handleGenericProps & {
  payload: payloadExpense;
};
export type listCostsProps = handleGenericProps & {
  setList: Dispatch<SetStateAction<rowsDataType[]>>;
};
export type handleFilterProps = {
  typesCost: number;
  list: rowsDataType[];
  typesExpense: number;
};
export type breadCrumbsItemsProps = {
  name: string;
  bill: string;
  idProject: string;
};
