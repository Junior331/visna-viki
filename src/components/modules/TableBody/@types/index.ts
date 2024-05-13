import { NavigateFunction } from 'react-router-dom';

export type rowType = {
  id: string;
  label: string;
};
export type rowData = Record<string, string | number>;

export type Props = {
  rows: rowData[];
  isEdit?: boolean;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
};

export type handleProps = {
  navigate: NavigateFunction;
  expenseActive: rowData;
};
