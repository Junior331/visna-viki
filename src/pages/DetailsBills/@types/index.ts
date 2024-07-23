/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import {
  shallowCostType,
  incorporationFeeType,
  genericV2ObjType
} from '@/pages/Bills/@types';
import { landSummaryType, payloadExpense } from '@/utils/types';
import { expense } from '@/pages/ListBills/@types';
import { NavigateFunction } from 'react-router-dom';
import { rowData } from '@/components/modules/TableBody/@types';
import { stepsProps } from '@/pages/Scenarios/@types';

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
  expenseHubId: number;
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

export type handleEditCostProps = {
  bill: any;
  projectName: string;
  cost: genericV2ObjType;
  expenseActive: rowData;
  navigate: NavigateFunction;
};
export type getListAllStepsProps = handleGenericProps & {
  id: number;
  setListAllSteps: Dispatch<SetStateAction<stepsProps[]>>;
};

export type handleSumValuesProps = {
  type: string;
  value1: string;
  value2: landSummaryType | string;
  fieldName: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export enum unitExpenseType {
  'type_0' = 'R$',
  'type_1' = '%',
  'type_2' = 'VB',
  'type_3' = 'mes',
  'type_4' = 'm²'
}
