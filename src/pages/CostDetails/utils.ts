import { convertToParams } from '@/utils/utils';
import {
  costsType,
  incorporationFeeType,
  shallowCostType
} from '../Bills/@types';
import { getBills } from '../Bills/services';
import {
  breadCrumbsItemsProps,
  deleteExpenseProps,
  editExpenseProps,
  listBillsProps,
  listCostsProps
} from './@types';
import { getDetailsBill } from './services';
import { deleteExpense, editExpense } from '@/services/services';

export const breadCrumbsItems = ({
  bill,
  name,
  billId,
  costName,
  idProject
}: breadCrumbsItemsProps) => [
  {
    path: `/edit?${convertToParams({ id: idProject, name })}`,
    label: `${name}` // PROJETO MINHA CASA MINHA VIDA
  },
  {
    path: `/bills?${convertToParams({ id: idProject, name })}`,
    label: 'Contas'
  },
  {
    path: `/details?isEdit=true&${convertToParams({
      idProject,
      name,
      id: billId
    })}`,
    label: `${bill}` //Custo Raso
  },
  {
    path: '',
    label: `${costName}`
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

export const deleteCost = async ({
  id,
  cost,
  costId,
  navigate,
  projectId,
  setLoading,
  projectName,
  setSnackbar
}: deleteExpenseProps) => {
  setLoading(true);

  try {
    await deleteExpense(id);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Custo deletada com sucesso'
    });
    navigate(
      `/details?isEdit=true&${convertToParams({
        idProject: projectId,
        name: projectName,
        id: costId
      })}`,
      {
        state: { cost: cost }
      }
    );
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
export const editCost = async ({
  id,
  state,
  expense,
  navigate,
  setLoading,
  setSnackbar
}: editExpenseProps) => {
  setLoading(true);

  try {
    await editExpense(id, expense);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Custo atualizado com sucesso'
    });
    navigate(
      `/details?isEdit=true&${convertToParams({
        idProject: expense.projectId,
        name: state.projectName,
        id: state.bill.id
      })}`,
      {
        state: { cost: state.bill }
      }
    );
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
