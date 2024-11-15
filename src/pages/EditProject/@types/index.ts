import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Snackbar } from '@/contexts/Snackbar';
import {
  unitHubType,
  landSummaryType,
  projectInfoType,
  unitCharacteristicsType,
  deadlineType,
  payloadSteps
} from '@/utils/types';

export type tabPanelProps = {
  value: number;
  index: number;
  children?: React.ReactNode;
};
export type handleGenericProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: (snackbarData: Snackbar) => void;
};
export type handleTabsProps = {
  newValue: number;
  setValue: Dispatch<React.SetStateAction<number>>;
};
export type getInfoProjectProps = {
  id: number;
  setSnackbar: (snackbarData: Snackbar) => void;
  setDate: Dispatch<SetStateAction<projectInfoType>>;
};
export type handleDeleteProjectProps = handleGenericProps & {
  id: string;
  navigate: NavigateFunction;
  setIsUpdate: Dispatch<React.SetStateAction<boolean>>;
  setIsDelete: Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
};
export type handleEditLandProps = handleGenericProps & {
  landId: number;
  payload: landSummaryType;
};
export type handleEditDeadlineIdProps = handleGenericProps & {
  payload: payloadSteps;
};
export type handleCreateDeadlineProps = handleGenericProps & {
  projectId: number;
  payload: deadlineType;
};
export type handleEditProjectProps = handleGenericProps & {
  id: number;
  name: string;
};
export type handleEdittUnitsProps = handleGenericProps & {
  unitId: number;
  payload: unitHubType;
};
export type getListUnitCharacteristicsProps = {
  setSnackbar: (snackbarData: Snackbar) => void;
  setListCharacteristics: Dispatch<SetStateAction<unitCharacteristicsType[]>>;
};
