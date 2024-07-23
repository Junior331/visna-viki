/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { payloadScenarios } from '@/utils/types';
import dayjs from 'dayjs';

export type stepsProps = {
  id: number;
  date: string;
  stepName: string;
  project_id: number;
  project_name: string;
};

export type scenariosProps = {
  hub: string;
  project_scenarios_hub_id: number;
  phases: [
    {
      id: number;
      hub: string;
      date: string;
      value: string;
      unity: string;
      step_id: number;
      step_name: string;
      timestamp_id: null;
      timestamp_name: null;
      project_name: string;
      project_step_id: null;
      project_scenarios_hub_id: number;
      months: [
        {
          date: string;
          month: number;
          receipts: null;
          salesPercents: number;
        }
      ];
    }
  ];
};

export type payloadPhasesProps = {
  id: number;
  value: number;
  projectStepId: number;
  scenarioTypesId: number;
};

export type phasesProps = payloadPhasesProps & {
  name: string;
};

export type styledProps = {
  size?: string;
  color?: string;
  margin?: string;
};

export type handleProps = {
  id: number;
  name: string;
  idProject: string;
  navigate: NavigateFunction;
};
export type handleServicesProps = {
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export type getListScenariosProps = handleServicesProps & {
  id: number;
  setListScenarios: Dispatch<SetStateAction<scenariosProps[]>>;
};
export type getListAllStepsProps = handleServicesProps & {
  id: number;
  setListAllSteps: Dispatch<SetStateAction<stepsProps[][]>>;
};
export type postScenariosProps = handleServicesProps & {
  id: number;
  payload: payloadScenarios;
  setNewScenarios: Dispatch<SetStateAction<boolean>>;
  setListAllSteps: Dispatch<SetStateAction<stepsProps[][]>>;
  setListScenarios: Dispatch<SetStateAction<scenariosProps[]>>;
};
export type deleteScenarioProps = handleServicesProps & {
  id: number;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export type handleStartChangeProps = {
  event: SelectChangeEvent<number>;
  listPhases: phasesProps[];
  setListPhases: Dispatch<SetStateAction<phasesProps[]>>;
};

export type handleDateChangeProps = {
  index: number;
  start: number;
  date: dayjs.Dayjs | null;
  listPhases: phasesProps[];
  listAllSteps: stepsProps[][];
  setListPhases: Dispatch<SetStateAction<phasesProps[]>>;
};

export type handleSalesPercentesChangeProps = {
  value: number;
  index: number;
  listPhases: phasesProps[];
  setListPhases: Dispatch<SetStateAction<phasesProps[]>>;
};
export enum stepNamePhase {
  id_49 = 'Lançamento',
  id_50 = 'Obra',
  id_51 = 'Pós Obras'
}
