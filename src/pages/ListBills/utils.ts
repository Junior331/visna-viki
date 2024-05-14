/* eslint-disable @typescript-eslint/no-explicit-any */
import { rowData } from '@/components/modules/TableBody/@types';
import { costsType } from '../Bills/@types';
import { getBills } from '../Bills/services';
import {
  deleteItemListProps,
  handleFilterProps,
  listCostsProps
} from './@types';

export const breadCrumbsItems = () => [
  {
    path: '',
    label: 'Contas'
  },
  {
    path: '',
    label: 'Dispesas'
  }
];
export const listCosts = async ({
  setList,
  setLoading,
  setSnackbar,
  setTypesCostOptions,
  setTypesExpenseOptions
}: listCostsProps) => {
  setLoading(true);
  try {
    const listExpenses: rowData[] = [];
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
          expenseType.expenses.forEach((expense: any) => {
            const expenseObj: rowData = {
              name: expense.name,
              typesCost: cost.name,
              typesExpense: expenseType.name,
              action: 'menu'
            };
            listExpenses.push(expenseObj);
          });
        }
      });
    });
    const listCostsStorage = window.sessionStorage.getItem('LIST_EXPENSES');

    if (listCostsStorage) {
      setList(JSON.parse(listCostsStorage) as rowData[]);
      console.log('listExpenses ::', JSON.parse(listCostsStorage) as rowData[]);
    } else {
      window.sessionStorage.setItem(
        'LIST_EXPENSES',
        JSON.stringify(listExpenses)
      );
      setList(listExpenses);
    }

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

export const handleFilter = ({
  list,
  typesCost,
  nameExpense,
  typesExpense
}: handleFilterProps) =>
  list.filter((expense) => {
    const isTypesCostMatch = !typesCost || expense.typesCost === typesCost;
    const isTypesExpenseMatch =
      !typesExpense || expense.typesExpense === typesExpense;
    const isNameExpenseMatch =
      !nameExpense ||
      expense.name.toString().toLowerCase().includes(nameExpense.toLowerCase());

    return isTypesCostMatch && isTypesExpenseMatch && isNameExpenseMatch;
  });

export const deleteItemList = ({
  listCostsStorage,
  itemName
}: deleteItemListProps): rowData[] => {
  const newList: rowData[] = JSON.parse(listCostsStorage as string);

  const index = newList.findIndex((item) => item.name === itemName);

  if (index !== -1) {
    newList.splice(index, 1);
  }

  return newList;
};
