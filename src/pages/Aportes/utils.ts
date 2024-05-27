import { convertToParams, formatDate, formatter } from '@/utils/utils';
import {
  aportesProps,
  breadCrumbsItemsProps,
  listAportesProps
} from './@types';
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
  page,
  perPage,
  setList,
  setLoading,
  setSnackbar,
  setPageTotal
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
        phaseOne: formatter.format(item.expenses),
        phaseTwo: formatter.format(item.payment),
        TotalContributions: formatter.format(item.total)
      };
      return obj;
    });

    setPageTotal(result.total);
    setList(newList);
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
