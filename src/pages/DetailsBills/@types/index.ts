import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import { shallowCostType, incorporationFeeType } from '@/pages/Bills/@types';

export type listBillsProps = {
  id: number;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<shallowCostType | incorporationFeeType>>;
};

export type handleEditProps = {
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
};
