import {
  createProfitability,
  deleteProfitability,
  listAllProfitabilityByProject
} from '@/services/services';
import {
  postProfitabilityProps,
  deleteProfitabilityProps,
  getListProfitabilityProps
} from './@types';

export const getListProfitability = async ({
  id,
  setLoading,
  setSnackbar,
  setListProfitability
}: getListProfitabilityProps) => {
  setLoading(true);
  try {
    const result = await listAllProfitabilityByProject({ projectId: id });
    setListProfitability(result);
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
  } finally {
    setLoading(false);
  }
};
export const postProfitability = async ({
  id,
  payload,
  setLoading,
  setSnackbar,
  setNewProfitability,
  setListProfitability
}: postProfitabilityProps) => {
  setLoading(true);
  try {
    await createProfitability(payload);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      horizontal: 'right',
      severity: 'success',
      message: 'Rentabilidade criada com sucesso'
    });
    setNewProfitability(false);
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
  } finally {
    setLoading(false);
    getListProfitability({
      id,
      setLoading,
      setSnackbar,
      setListProfitability
    });
  }
};
export const handleDeleteProfitability = async ({
  id,
  idProject,
  setLoading,
  setSnackbar,
  setIsDelete,
  setOpenModal,
  setListProfitability
}: deleteProfitabilityProps) => {
  setLoading(true);
  setIsDelete(false);
  setOpenModal(false);
  try {
    await deleteProfitability(id);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      horizontal: 'right',
      severity: 'success',
      message: 'Rentabilidade deletada com sucesso'
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
  } finally {
    setLoading(false);
    getListProfitability({
      setLoading,
      setSnackbar,
      id: idProject,
      setListProfitability
    });
  }
};
