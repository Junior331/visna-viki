import {
  convertToParams,
  formatDate,
  formatter,
  formatterV2
} from '@/utils/utils';
import {
  aportesProps,
  breadCrumbsItemsProps,
  createNewAporteProps,
  handleEditAporteProps,
  handleSumValuesProps,
  listAportesProps
} from './@types';
import { createAporte, getAportesByProject } from '@/services/services';

export const breadCrumbsItems = ({ name, id }: breadCrumbsItemsProps) => [
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: `${name}`
  },
  {
    path: '',
    label: 'Aportes'
  }
];
export const listAportes = async ({
  id,
  page,
  perPage,
  setList,
  setLoading,
  setSnackbar,
  setPageTotal,
  setAccumulator
}: listAportesProps) => {
  setLoading(true);

  try {
    const result = await getAportesByProject(id, page, perPage);

    const newList = result.items.map((item: aportesProps) => {
      const obj = {
        id: item.id,
        projectId: item.projectId,
        date: formatDate(item.date || ''),
        observation: item.observation,
        phaseTwo: formatter.format(item.payment),
        phaseOne: formatter.format(item.expenses),
        TotalContributions: formatter.format(item.total),
        action: 'menu'
      };
      return obj;
    });

    setList(newList);
    setAccumulator(result.accumulator);
    setPageTotal(result.lastPage);
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
export const handleCreateAporte = async ({
  payload,
  setLoading,
  setSnackbar,
  setOpenModalNewAporte
}: createNewAporteProps) => {
  setLoading(true);

  try {
    await createAporte(payload);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Novo aporte criado com sucesso'
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
    setOpenModalNewAporte(false);
  }
};

export const handleSumValues = ({
  value1,
  value2,
  fieldName,
  setFieldValue
}: handleSumValuesProps) => {
  const sum1 = parseFloat(value1.replace(/\./g, '').replace(',', '.')) || 0;
  const sum2 = parseFloat(value2.replace(/\./g, '').replace(',', '.')) || 0;
  const sum = sum1 + sum2;
  sum.toFixed(2);

  setFieldValue?.(fieldName, formatterV2.format(sum));
};
export const handleEditAporte = ({
  id,
  name,
  aporte,
  navigate
}: handleEditAporteProps) => {
  navigate(
    `/aporte?${convertToParams({
      id,
      name
    })}`,
    {
      state: {
        aporte: aporte
      }
    }
  );
};
