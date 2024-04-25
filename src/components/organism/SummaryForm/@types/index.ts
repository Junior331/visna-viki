import { projectDateType } from '@/utils/types';

export type Props = {
  date: projectDateType;
  handleStep: (step: number) => void;
};
