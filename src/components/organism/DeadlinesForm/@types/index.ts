import { Dispatch, SetStateAction } from 'react';
import { projectDateType } from '@/utils/types';

export type Props = {
  date: projectDateType;
  handleStep: (step: number) => void;
  setDate: Dispatch<SetStateAction<projectDateType>>;
};
export type handleSumValuesProps = {
  value1: number;
  value2: number;
  value3: number;
  fieldName: string;
  setFieldValue: (
    field: string,
    value: number,
    shouldValidate?: boolean | undefined
  ) => void;
};
