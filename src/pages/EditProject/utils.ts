/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  editLands,
  editUnits,
  editProject,
  deleteProject,
  listUnitCharacteristics,
  createDeadline,
  editSteps
} from '@/services/services';
import {
  handleCreateDeadlineProps,
  handleDeleteProjectProps,
  handleEditDeadlineIdProps,
  handleEditLandProps,
  handleEditProjectProps,
  handleEdittUnitsProps,
  getListUnitCharacteristicsProps,
  handleTabsProps
} from './@types';
import { handleSumValuesProps } from '@/components/organism/UnitsForm/@types';

export const unitTypeOptions = [
  { value: 1, label: 'Residencial' },
  { value: 2, label: 'Não Residencial' },
  { value: 3, label: 'Loja' },
  { value: 4, label: 'Vagas' },
  { value: 5, label: 'HMP' },
  { value: 6, label: 'UR' },
  { value: 7, label: 'HIS' },
  { value: 8, label: 'HNP' }
];
export const isEmptyUnitCharacteristics = [1, 2, 6, 7, 8];

export const unitSummaryDefault = {
  id: 0,
  netAmount: 0,
  unitHubId: 0,
  unitTypeId: 0,
  averageArea: 0,
  marketAmount: 0,
  unitQuantity: 0,
  exchangeQuantity: 0,
  areaPrivativaTotal: 0
};

export const breadCrumbsItems = (name: string) => [
  {
    path: '/home',
    label: 'Projetos'
  },
  {
    path: '',
    label: 'Editar projeto'
  },
  {
    path: '',
    label: `${name}`
  }
];

export const handleSumValues = ({
  id,
  type,
  value1,
  value2,
  fieldName,
  value3 = '',
  setFieldValue
}: handleSumValuesProps) => {
  const parsedValue1 = value1.replace(',', '.');
  const parsedValue2 = value2.replace(',', '.');
  const parsedValue3 = value3?.replace(',', '.');

  if (type === 'sum') {
    if (parsedValue1 && parsedValue2) {
      const sum = parseFloat(parsedValue1) * parseFloat(parsedValue2);
      sum.toFixed(2);

      setFieldValue(`unit[${id}].${fieldName}`, sum);
    } else {
      console.error(
        'Um ou ambos os valores fornecidos não são números válidos.'
      );
    }
  }
  if (type === 'mult') {
    const sum1 = parseFloat(parsedValue1.replace(/\./g, '').replace(',', '.'));
    const sum2 = parseFloat(parsedValue2.replace(/\./g, '').replace(',', '.'));
    const sum3 = parseFloat(parsedValue3.replace(/\./g, '').replace(',', '.'));
    const sum = sum1 * (sum2 - sum3);
    setFieldValue(`unit[${id}].${fieldName}`, sum);
  }
  if (type === 'TUID') {
    const sum =
      parseFloat(parsedValue1) *
      (parseFloat(parsedValue2) - parseFloat(parsedValue3));

    sum.toFixed(2);
    setFieldValue?.(fieldName, sum);
  }
  if (type === 'sumLand') {
    const sum1 = parseFloat(parsedValue1.replace(/\./g, '').replace(',', '.'));
    const sum2 = parseFloat(parsedValue2.replace(/\./g, '').replace(',', '.'));

    const sum = sum1 * sum2;

    setFieldValue?.(fieldName, sum);
  }
  if (type === 'split') {
    const sum1 = parseFloat(parsedValue1.replace(/\./g, '').replace(',', '.'));
    const sum2 = parseFloat(parsedValue2.replace(/\./g, '').replace(',', '.'));

    const sum = (sum1 / sum2 - 1) * 100;

    setFieldValue?.(fieldName, sum > 0 ? sum.toFixed() : 0);
  }
};

export const handleTabs = ({ setValue, newValue }: handleTabsProps) => {
  setValue(newValue);
};

export const handleDeleteProject = async ({
  id,
  navigate,
  setLoading,
  setIsDelete,
  setSnackbar,
  setOpenModal
}: handleDeleteProjectProps) => {
  setLoading(true);
  try {
    await deleteProject(parseFloat(id));
    setLoading(false);
    setOpenModal(false);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      severity: 'success',
      horizontal: 'right',
      message: 'Projeto deletado com sucesso'
    });
    navigate('/home');
  } catch (error) {
    if (error instanceof Error) {
      setLoading(false);
      setIsDelete(false);
      setOpenModal(false);
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

export const handleEditLand = async ({
  landId,
  payload,
  setLoading,
  setSnackbar
}: handleEditLandProps) => {
  setLoading(true);

  try {
    await editLands(landId, payload);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Terreno editado com sucesso'
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
export const handleCreateDeadline = async ({
  payload,
  projectId,
  setLoading,
  setSnackbar
}: handleCreateDeadlineProps) => {
  setLoading(true);

  try {
    await createDeadline(projectId, payload);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Prazos Criado com sucesso'
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
export const handleEditDeadline = async ({
  payload,
  setLoading,
  setSnackbar
}: handleEditDeadlineIdProps) => {
  setLoading(true);

  try {
    await editSteps(payload);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Prazos editados com sucesso'
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
export const handleEditProject = async ({
  id,
  name,
  setLoading,
  setSnackbar
}: handleEditProjectProps) => {
  setLoading(true);

  try {
    await editProject(id, name);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      severity: 'success',
      horizontal: 'right',
      message: 'Terreno editado com sucesso'
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
export const handleEdittUnits = async ({
  unitId,
  payload,
  setLoading,
  setSnackbar
}: handleEdittUnitsProps) => {
  setLoading(true);
  try {
    await editUnits(unitId, payload);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Prazos editados com sucesso'
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
export const getListUnitCharacteristics = async ({
  setSnackbar,
  setListCharacteristics
}: getListUnitCharacteristicsProps) => {
  try {
    const result = await listUnitCharacteristics();
    const updatedList = result.filter((item: any) => item.name !== 'UR');
    setListCharacteristics(updatedList);
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
  }
};
