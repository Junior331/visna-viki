import {
  createNewCostProps,
  handleEditProps,
  handleSumTotalValueProps,
  listBillsProps
} from './@types';
import { createCost } from './services';

export const breadCrumbsItems = (projectName: string, bill: string) => [
  {
    path: '',
    label: `${projectName}`
  },
  {
    path: '',
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
  setLoading,
  setSnackbar
}: listBillsProps) => {
  setLoading(true);
  try {
    setDate(item);
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
  const parsedValue1 = value1.replace(',', '.');
  const parsedValue2 = value2.replace(',', '.');

  if (parsedValue1 && parsedValue2) {
    const sum = parseFloat(parsedValue1) + parseFloat(parsedValue2);
    sum.toFixed(2);

    setFieldValue?.(fieldName, sum);
  } else {
    console.error('Um ou ambos os valores fornecidos não são números válidos.');
  }
};
