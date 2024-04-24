import { Dispatch, SetStateAction } from 'react';
import { projectDateType } from '@/utils/types';

export type Props = {
  date: projectDateType;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<projectDateType>>;
};
