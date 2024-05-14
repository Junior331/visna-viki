import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { projectDateType } from '@/utils/types';

export type handleSaveInfosByStepProps = {
  date: projectDateType;
  stepsIsDone: string[];
  navigate: NavigateFunction;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
