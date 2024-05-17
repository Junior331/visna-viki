import { deleteProject, editDeadline, editLands } from '@/services/services';
import {
  handleDeleteProjectProps,
  handleEditDeadlineIdProps,
  handleEditLandProps,
  handleTabsProps
} from './@types';

export const unitSummaryDefault = {
  id: 0,
  netAmount: 0,
  unitHubId: 0,
  unitTypeId: 0,
  averageArea: 0,
  marketAmount: 0,
  unitQuantity: 0,
  exchangeQuantity: 0,
  totalExchangeArea: 0,
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
export const handleEditDeadline = async ({
  deadlineId,
  payload,
  setLoading,
  setSnackbar
}: handleEditDeadlineIdProps) => {
  setLoading(true);

  try {
    await editDeadline(deadlineId, payload);
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
