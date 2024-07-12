import { listProject } from '@/services/services';
import { getInfoProjectProps } from './@types';

export const getInfoProject = async ({
  id,
  setDate,
  setSnackbar
}: getInfoProjectProps) => {
  try {
    const result = await listProject(id);

    setDate(result);
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
};
