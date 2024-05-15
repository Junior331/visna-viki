/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import { shallowCostType, incorporationFeeType } from '@/pages/Bills/@types';
import { payloadExpense } from '@/utils/types';

export type listBillsProps = {
  id: number;
  item: shallowCostType | incorporationFeeType;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
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
export type createNewCostProps = {
  payload: payloadExpense;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};
