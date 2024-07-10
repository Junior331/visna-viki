import { Dispatch, SetStateAction } from 'react';
import { Snackbar } from '@/contexts/Snackbar';
import { scenariosProps } from '@/pages/Scenarios/@types';

export type handleServicesProps = {
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export type getDetailsScenarioProps = handleServicesProps & {
  id: number;
  projectId: number;
  setSummaryScenarios: Dispatch<SetStateAction<scenariosProps>>;
};
