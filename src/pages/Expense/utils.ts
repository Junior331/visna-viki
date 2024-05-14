/* eslint-disable @typescript-eslint/no-explicit-any */
import { rowData } from '@/components/modules/TableBody/@types';
import {
  costsType,
  incorporationFeeType,
  shallowCostType
} from '../Bills/@types';
import { getBills } from '../Bills/services';
import { listBillsProps, listCostsProps, updateListItemProps } from './@types';
import { getDetailsBill } from './services';

export const breadCrumbsItems = (name: string) => [
  {
    path: '',
    label: `Contas`
  },
  {
    path: '',
    label: 'Despesas'
  },
  {
    path: '',
    label: `${name}`
  }
];

export const listDetailsBill = async ({
  setDate,
  setLoading,
  setSnackbar
}: listBillsProps) => {
  setLoading(true);
  try {
    const result = (await getDetailsBill()) as
      | shallowCostType
      | incorporationFeeType;
    setDate(result);
    setLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setLoading(false);
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: error.message
      });
    }
  }
};

export const listCosts = async ({
  setLoading,
  setSnackbar,
  setTypesCostOptions,
  setTypesExpenseOptions
}: listCostsProps) => {
  setLoading(true);
  try {
    const result = (await getBills(false)) as costsType;
    const typesCostOptions: { id: number; name: string }[] = [];
    const typesExpenseOptions: { id: number; name: string }[] = [];

    Object.values(result.costs).map((cost) => {
      typesCostOptions.push({ id: cost.id, name: cost.name });
      Object.values(cost).forEach((expenseType: any) => {
        if (Array.isArray(expenseType.expenses)) {
          typesExpenseOptions.push({
            id: expenseType.id,
            name: expenseType.name
          });
        }
      });
    });

    setTypesCostOptions(typesCostOptions);
    setTypesExpenseOptions(typesExpenseOptions);
    setLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setLoading(false);
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: error.message
      });
    }
  }
};

export const updateListItem = ({
  listCostsStorage,
  stateExpense,
  newValues
}: updateListItemProps): rowData[] => {
  const newList: any = JSON.parse(listCostsStorage as string);

  const index = newList.findIndex(
    (item: any) => item.name === stateExpense.name
  );

  if (index !== -1) {
    newList[index] = {
      ...newList[index],
      ...Object.fromEntries(
        Object.entries(newValues).filter(([, value]) => value !== undefined)
      )
    };
  } else {
    newList.push({
      name: stateExpense.name,
      ...Object.fromEntries(
        Object.entries(newValues).filter(([, value]) => value !== undefined)
      )
    });
  }

  return newList;
};