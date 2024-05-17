import {
  costsType,
  incorporationFeeType,
  shallowCostType
} from '../Bills/@types';
import { getBills } from '../Bills/services';
import {
  deleteExpenseProps,
  editExpenseProps,
  listBillsProps,
  listCostsProps
} from './@types';
import { getDetailsBill } from './services';
import { deleteExpenseTypes, editExpenseTypes } from '@/services/services';

export const breadCrumbsItems = (name: string) => [
  {
    path: '/listbills',
    label: `Contas`
  },
  {
    path: '/listbills',
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
    const result = (await getBills()) as costsType;
    const typesCostOptions: { id: number; name: string }[] = [];
    const typesExpenseOptions: { id: number; name: string }[] = [];

    Object.values(result.costs).map((cost) => {
      typesCostOptions.push({ id: cost.id, name: cost.name });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const deleteExpense = async ({
  id,
  navigate,
  setLoading,
  setSnackbar
}: deleteExpenseProps) => {
  setLoading(true);

  try {
    await deleteExpenseTypes(id);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Despesa deletada com sucesso'
    });
    navigate('/listbills');
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
export const editExpense = async ({
  id,
  expense,
  navigate,
  setLoading,
  setSnackbar
}: editExpenseProps) => {
  setLoading(true);

  try {
    await editExpenseTypes(id, expense);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Despesa atualizada com sucesso'
    });
    navigate('/listbills');
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
