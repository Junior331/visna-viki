import { Snackbar } from '@/contexts/Snackbar';
import { subBillType } from '@/pages/Bills/@types';
import { Dispatch, SetStateAction } from 'react';

export type listBillsProps = {
  id: string;
  setDate: Dispatch<SetStateAction<subBillType>>;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};

export type handleEditProps = {
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
};
