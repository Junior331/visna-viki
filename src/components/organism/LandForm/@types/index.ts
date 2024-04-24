import { projectDateType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
  isShow: boolean;
  date: projectDateType;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<projectDateType>>;
};
