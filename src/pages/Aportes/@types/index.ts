import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';

export type breadCrumbsItemsProps = {
  id: string;
  name: string;
};
export type handleGenericProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};
export type listAportesProps = handleGenericProps & {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setList: Dispatch<SetStateAction<any[]>>;
};
