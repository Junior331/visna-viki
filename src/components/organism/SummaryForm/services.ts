import { Snackbar } from '@/contexts/Snackbar';
import {
  createLands,
  createProject,
  createSteps,
  createUnits
} from '@/services/services';
import { projectDateType } from '@/utils/types';
import { NavigateFunction } from 'react-router-dom';

export const handleCreateProject = async (
  date: projectDateType,
  navigate: NavigateFunction,
  setSnackbar: (snackbarData: Snackbar) => void
) => {
  const creteP = await createProject(date.lands.name);
  const projectId = creteP.id;

  if (creteP.id) {
    try {
      await createLands(projectId, date.lands);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
        const message = error?.response.data.message;
        setSnackbar({
          isOpen: true,
          severity: 'error',
          vertical: 'bottom',
          horizontal: 'left',
          message: message
        });
      }
    }
    try {
      await createUnits(projectId, date.units);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbar({
          isOpen: true,
          severity: 'error',
          vertical: 'bottom',
          horizontal: 'left',
          message: error.message
        });
      }
    }
    try {
      const payload = {
        ...date.deadline,
        projectId
      };
      await createSteps(payload);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbar({
          isOpen: true,
          severity: 'error',
          vertical: 'bottom',
          horizontal: 'left',
          message: error.message
        });
      }
    }
  }
  navigate('/home');
  setSnackbar({
    isOpen: true,
    severity: 'success',
    vertical: 'top',
    horizontal: 'right',
    message: 'Projeto criado com sucesso'
  });
};
