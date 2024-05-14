/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import { shallowCostType, incorporationFeeType } from '@/pages/Bills/@types';

export type listBillsProps = {
  id: number;
  item: shallowCostType | incorporationFeeType;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<any>>;
};

export type handleEditProps = {
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
};
export type initialState = {
  land: {
    id: number;
    name: string;
    rows: never[];
  };
  project: {
    id: number;
    name: string;
    rows: never[];
  };
  constructions: {
    id: number;
    name: string;
    rows: never[];
  };
  Licenses: {
    id: number;
    name: string;
    rows: never[];
  };
  AdministrativeCosts: {
    id: number;
    name: string;
    rows: never[];
  };
};
