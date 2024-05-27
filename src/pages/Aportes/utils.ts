import { convertToParams } from '@/utils/utils';
import { breadCrumbsItemsProps, listAportesProps } from './@types';
import { getAportesByProject } from '@/services/services';

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
  setList,
  setLoading,
  setSnackbar
}: listAportesProps) => {
  setLoading(true);

  try {
    const result = await getAportesByProject(id);
    console.log('result ::', result);

    setList(result);
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
