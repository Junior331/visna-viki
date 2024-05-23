/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBills, getCostsByProject } from '../Bills/services';
import { costsType } from '../ListBills/@types';
import {
  breadCrumbsItemsProps,
  createNewCostProps,
  expenseType,
  handleEditProps,
  handleFilterProps,
  handleSumTotalValueProps,
  listBillsProps,
  listCostsProps,
  rowsDataType
} from './@types';
import { createCost } from './services';
import { convertToParams } from '@/utils/utils';

export const breadCrumbsItems = ({
  bill,
  name,
  idProject
}: breadCrumbsItemsProps) => [
  {
    path: `/edit?${convertToParams({ id: idProject, name })}`,
    label: `${name}`
  },
  {
    path: `/bills?${convertToParams({ id: idProject, name })}`,
    label: 'Contas'
  },
  {
    path: '',
    label: `${bill}`
  }
];

export const handleEdit = ({ setIsFormEdit }: handleEditProps) => {
  setIsFormEdit((prev) => !prev);
};
export const handleAdd = () => {};
export const handleDelete = () => {};

export const listDetailsBill = async ({
  item,
  setDate,
  idProject,
  setLoading,
  setSnackbar
}: listBillsProps) => {
  setLoading(true);
  try {
    const result = await getCostsByProject(parseFloat(idProject));

    const date = Object.values(result.costs).find(
      (cost: any) => cost.id === item.id
    ) as any;

    setDate(date);
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

export const createNewCost = async ({
  payload,
  setLoading,
  setSnackbar
}: createNewCostProps) => {
  setLoading(true);
  try {
    await createCost(payload);
    setLoading(false);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Novo custo criado com sucesso'
    });
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

export const initialValues = {
  land: {
    id: 0,
    name: '',
    rows: []
  },
  project: {
    id: 0,
    name: '',
    rows: []
  },
  constructions: {
    id: 0,
    name: '',
    rows: []
  },
  Licenses: {
    id: 0,
    name: '',
    rows: []
  },
  AdministrativeCosts: {
    id: 0,
    name: '',
    rows: []
  }
};

export const handleSumTotalValue = ({
  value1,
  value2,
  fieldName,
  setFieldValue
}: handleSumTotalValueProps) => {
  const parsedValue1 = value1.replace(/\./g, '').replace(',', '.');
  const parsedValue2 = value2.replace(/\./g, '').replace(',', '.');

  if (parsedValue1 && parsedValue2) {
    const sum = parseFloat(parsedValue1) + parseFloat(parsedValue2);
    sum.toFixed(2);
    setFieldValue?.(fieldName, sum * 100);
  } else {
    console.error('Um ou ambos os valores fornecidos não são números válidos.');
  }
};

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
                expenseId: parseFloat(expense.id),
                typesIdCost: parseFloat(cost.id as string),
                typesIdExpense: parseFloat(expenseType.id)
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
  typesExpense
}: handleFilterProps) => {
  return list.filter(({ typesIdCost, typesIdExpense }) => {
    const isTypesCostMatch = !typesCost || typesIdCost === typesCost;
    const isTypesExpenseMatch =
      !typesExpense || typesIdExpense === typesExpense;

    return isTypesCostMatch && isTypesExpenseMatch;
  });
};
