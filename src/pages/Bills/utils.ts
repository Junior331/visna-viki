import { convertToParams } from '@/utils/utils';
import { handleProps, listBillsProps } from './@types';
import { getBills } from './services';

export const breadCrumbsItems = (name: string) => [
  {
    path: '',
    label: `${name}`
  },
  {
    path: '',
    label: 'Contas'
  }
];

export const handleEdit = ({ id, idProject, name, navigate }: handleProps) => {
  navigate(`/details?isEdit=true&${convertToParams({ idProject, name, id })}`);
};
export const handleView = ({ id, name, navigate }: handleProps) => {
  navigate(`/details?${convertToParams({ id, name })}`);
};
export const handleDelete = () => {};

export const listBills = async ({
  setDate,
  setLoading,
  setSnackbar
}: listBillsProps) => {
  setLoading(true);
  try {
    const result = await getBills(true);
    setDate(result);
    setLoading(false);
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
  }
};
