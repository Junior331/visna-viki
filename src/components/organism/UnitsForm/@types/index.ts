/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { projectDateType, unitSummaryType } from '@/utils/types';

export type Props = {
  date: projectDateType;
  handleStep: (step: number) => void;
  setDate: Dispatch<SetStateAction<projectDateType>>;
};

export type handleChangeUnitProps = {
  index: number;
  value: string | number;
  field: keyof { [key: string]: unitSummaryType };
  setListUnit: Dispatch<React.SetStateAction<unitSummaryType[]>>;
};

export type handleSumValuesProps = {
  type: string;
  value1: string;
  value2: string;
  value3?: string;
  fieldName: string;
  id: string | number;
  setListUnit: Dispatch<React.SetStateAction<unitSummaryType[]>>;
  setFieldValue?: (field: string, value: any) => void;
};
