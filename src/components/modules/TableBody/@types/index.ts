/* eslint-disable @typescript-eslint/no-explicit-any */
import { genericV2ObjType } from '@/pages/Bills/@types';
import { NavigateFunction } from 'react-router-dom';

export type rowType = {
  id: string;
  label: string;
};
export type fields = (string | number)[][];
export type rowData = Record<string, string | number>;

export type Props = {
  formik?: any;
  rows: rowData[];
  isEdit?: boolean;
  itemActive?: any;
  cost?: genericV2ObjType;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
};

export type handleProps = {
  navigate: NavigateFunction;
  expenseActive: rowData;
};
