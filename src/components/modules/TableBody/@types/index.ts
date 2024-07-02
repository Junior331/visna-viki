/* eslint-disable @typescript-eslint/no-explicit-any */
import { genericV2ObjType } from '@/pages/Bills/@types';
import { NavigateFunction } from 'react-router-dom';

export type rowType = {
  id: string;
  label: string;
};
export type fields = (string | number)[][];
export type rowData = Record<string, string | number>;

export type handleProps = {
  navigate: NavigateFunction;
  expenseActive: rowData;
};

export type Props = {
  formik?: any;
  rows: rowData[];
  isEdit?: boolean;
  itemActive?: any;
  className?: string;
  cost?: genericV2ObjType;
  handleEdit?: (params: handleProps) => void;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
};
