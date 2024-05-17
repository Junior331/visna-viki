import { Snackbar } from '@/contexts/Snackbar';
import { payloadExpenseType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';

export type costType = {
  id: number;
  name: string;
};
export type expense = {
  id: string;
  name: string;
};
export type expenseType = {
  name: string;
  expenses: expense[];
};
export type cost = {
  name: string;
  [key: string]: expenseType | string;
};
export type costsType = {
  costs: { [key: string]: cost };
};
export type rowsDataType = {
  name: string;
  typesCost: string;
  typesExpense: string;
  action: string;
};
export enum typesIdCosts {
  'Custo Raso' = 1,
  'Taxa da Incorporação' = 2
}
export enum typesExpenses {
  'Terreno, Outorga e Despesas de Aquisição' = 1,
  'Projetos, Assessorias e Decoração' = 2,
  'Obra' = 3,
  'Licenças / Ambiental / Legalização' = 4,
  'Despesas Administrativas' = 5,
  'Taxa Administrativa' = 6
}
export enum unitExpenseTypes {
  unitType1 = '%',
  unitType2 = 'VB',
  unitType3 = 'mes',
  unitType4 = 'm²'
}
export type handleGenericProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};
export type listCostsProps = handleGenericProps & {
  setList: Dispatch<SetStateAction<rowsDataType[]>>;
};
export type handleFilterProps = {
  typesCost: number;
  nameExpense: string;
  list: rowsDataType[];
  typesExpense: number;
};

export type handleCreateExpenseProps = handleGenericProps & {
  newExpense: payloadExpenseType;
};
