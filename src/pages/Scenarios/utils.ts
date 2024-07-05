import { convertToParams } from '@/utils/utils';
import { getListScenariosProps, handleProps } from './@types';
import { listAllScenariosByProject } from '@/services/services';

export const breadCrumbsItems = (id: string, name: string) => [
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: `${name}`
  },
  {
    path: '',
    label: 'Cenários de Venda'
  }
];
export const handleView = ({ id, name, navigate, idProject }: handleProps) => {
  const formatedId = id.toString();
  navigate(
    `/detailsscenario?${convertToParams({
      idProject,
      name,
      id: formatedId
    })}`
  );
};
export const handleDelete = () => {};

export const getListScenarios = async ({
  id,
  setLoading,
  setSnackbar,
  setListScenarios
}: getListScenariosProps) => {
  setLoading(true);
  try {
    const result = await listAllScenariosByProject({ projectId: id });
    setListScenarios(result);
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
