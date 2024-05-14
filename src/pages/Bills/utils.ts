import { convertToParams } from '@/utils/utils';
import {
  costsType,
  handleProps,
  listBillsProps,
  genericObjType
} from './@types';
import { getBills } from './services';

export const emptyInfo = (info: string | number | genericObjType) =>
  info instanceof Object &&
  'id' in info &&
  'name' in info &&
  'expenses' in info;

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
export const handleEdit = ({
  id,
  name,
  cost,
  navigate,
  idProject
}: handleProps) => {
  const formatedId = id.toString();
  navigate(
    `/details?isEdit=true&${convertToParams({
      idProject,
      name,
      id: formatedId
    })}`,
    {
      state: {
        cost
      }
    }
  );
};
export const handleView = ({ id, idProject, name, navigate }: handleProps) => {
  const formatedId = id.toString();
  navigate(
    `/details?isEdit=false${convertToParams({
      idProject,
      name,
      id: formatedId
    })}`
  );
};
export const handleDelete = () => {};
export const listBills = async ({
  setDate,
  setLoading,
  setSnackbar
}: listBillsProps) => {
  setLoading(true);
  try {
    const result = (await getBills(false)) as costsType;
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
