import { convertToParams } from '@/utils/utils';
import { deleteAporte, editAporte } from '@/services/services';
import { handleDeleteAporteProps, handleEditAporteProps } from './@types';

export const breadCrumbsItems = (
  id: string,
  name: string,
  observation: string
) => [
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: `${name}`
  },
  {
    path: `/aportes?${convertToParams({ id, name })}`,
    label: 'Aportes'
  },
  {
    path: '',
    label: `${observation}`
  }
];

export const handleDeleteAporte = async ({
  id,
  name,
  navigate,
  projectId,
  setLoading,
  setSnackbar
}: handleDeleteAporteProps) => {
  setLoading(true);

  try {
    await deleteAporte(id);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Aporte deletada com sucesso'
    });
    navigate(`/aportes?${convertToParams({ id: projectId, name })}`);
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
export const handleEditAporte = async ({
  id,
  name,
  payload,
  navigate,
  projectId,
  setLoading,
  setSnackbar
}: handleEditAporteProps) => {
  setLoading(true);

  try {
    await editAporte(id, payload, projectId);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      horizontal: 'right',
      severity: 'success',
      message: 'Aporte atualizada com sucesso'
    });
    navigate(`/aportes?${convertToParams({ id: projectId, name })}`);
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
