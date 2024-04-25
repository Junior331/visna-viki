import { projectDateType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
  isShow: boolean;
  date: projectDateType;
  handleStep: (step: number) => void;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<projectDateType>>;
};
