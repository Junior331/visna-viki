/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertToParams } from '@/utils/utils';
import { getBills } from '../Bills/services';
import {
  costsType,
  expenseType,
  handleCreateExpenseProps,
  handleEditExpenseProps,
  handleFilterProps,
  listCostsProps,
  rowsDataType,
  typesExpenses,
  typesIdCosts
} from './@types';
import { createExpenseTypes } from '@/services/services';

export const breadCrumbsItems = () => [
  {
    path: '',
    label: 'Contas'
  },
  {
    path: '',
    label: 'Despesas'
  }
];
export const listCosts = async ({
  setList,
  setLoading,
  setSnackbar
}: listCostsProps) => {
  setLoading(true);

  try {
    const result = (await getBills()) as costsType;

    const listExpenses = Object.keys(result.costs).reduce<rowsDataType[]>(
      (acc, costKey) => {
        const cost = result.costs[costKey];
        const expenses = Object.keys(cost).reduce<rowsDataType[]>(
          (innerAcc, expenseTypeKey) => {
            const expenseType = cost[expenseTypeKey] as expenseType;
            if (Array.isArray(expenseType.expenses)) {
              const mappedExpenses = expenseType.expenses.map((expense) => ({
                name: expense.name,
                typesCost: cost.name,
                typesIdCost: cost.id,
                expenseId: expense.id,
                typesExpense: expenseType.name,
                action: 'menu'
              }));
              return innerAcc.concat(mappedExpenses);
            }
            return innerAcc;
          },
          []
        );
        return acc.concat(expenses);
      },
      []
    );

    setList(listExpenses);
  } catch (error) {
    if (error instanceof Error) {
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: error.message
      });
    } else {
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: 'Ocorreu um erro inesperado'
      });
    }
  } finally {
    setLoading(false);
  }
};

export const handleFilter = ({
  list,
  typesCost,
  nameExpense,
  typesExpense
}: handleFilterProps) => {
  return list.filter((expense) => {
    const typesIdCost =
      typesIdCosts[expense.typesCost as keyof typeof typesIdCosts];
    const typesIdExpense =
      typesExpenses[expense.typesExpense as keyof typeof typesExpenses];

    const isTypesCostMatch = !typesCost || typesIdCost === typesCost;
    const isTypesExpenseMatch =
      !typesExpense || typesIdExpense === typesExpense;
    const isNameExpenseMatch =
      !nameExpense ||
      expense.name
        .toString()
        .toLowerCase()
        .includes(nameExpense.trim().toLowerCase());

    return isTypesCostMatch && isTypesExpenseMatch && isNameExpenseMatch;
  });
};

export const handleCreateExpense = async ({
  newExpense,
  setLoading,
  setSnackbar
}: handleCreateExpenseProps) => {
  setLoading(true);

  try {
    await createExpenseTypes(newExpense);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Despesa criada com sucesso'
    });
  } catch (error) {
    if (error instanceof Error) {
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: error.message
      });
    } else {
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: 'Ocorreu um erro inesperado'
      });
    }
  } finally {
    setLoading(false);
  }
};

export const handleEditExpense = ({
  navigate,
  expenseActive
}: handleEditExpenseProps) => {
  navigate(
    `/expense?isEdit=true&${convertToParams({
      name: expenseActive.typesCost as string
    })}`,
    {
      state: {
        expense: expenseActive
      }
    }
  );
};
