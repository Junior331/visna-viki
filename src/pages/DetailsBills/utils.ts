import { incorporationFeeType, shallowCostType } from '../Bills/@types';
import { handleEditProps, listBillsProps } from './@types';
import { getDetailsBill } from './services';

export const breadCrumbsItems = (projectName: string, bill: string) => [
  {
    path: '',
    label: `${projectName}`
  },
  {
    path: '',
    label: 'Contas'
  },
  {
    path: '',
    label: `${bill}`
  }
];

export const handleEdit = ({ setIsFormEdit }: handleEditProps) => {
  setIsFormEdit((prev) => !prev);
};
export const handleView = () => {};
export const handleDelete = () => {};

export const listDetailsBill = async ({
  setDate,
  setLoading,
  setSnackbar
}: listBillsProps) => {
  setLoading(true);
  try {
    const result = (await getDetailsBill()) as
      | shallowCostType
      | incorporationFeeType;
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
