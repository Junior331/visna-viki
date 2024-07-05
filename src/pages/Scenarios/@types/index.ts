import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type scenariosProps = {
  id: number;
  step: string;
  date: string;
  unity: string;
  label: string;
  value: string;
  timestamp: string;
  project_name: string;
};
export type handleProps = {
  id: number;
  name: string;
  idProject: string;
  navigate: NavigateFunction;
};
export type getListScenariosProps = {
  id: number;
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  setListScenarios: Dispatch<SetStateAction<scenariosProps[]>>;
};
