/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import {
  unitType,
  projectDateType,
  unitSummaryType,
  unitCharacteristicsType
} from '@/utils/types';

export type genericProps = {
  values: unitType;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export type Props = {
  date: projectDateType;
  handleStep: (step: number) => void;
  listCharacteristics: unitCharacteristicsType[];
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
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};
