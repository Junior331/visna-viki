import { listScenariosById } from '@/services/services';
import { getDetailsScenarioProps } from './@types';

export const getDetailsScenario = async ({
  id,
  projectId,
  setLoading,
  setSnackbar,
  setSummaryScenarios
}: getDetailsScenarioProps) => {
  setLoading(true);
  try {
    const result = await listScenariosById(projectId, id);
    setSummaryScenarios(result);
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
