import { convertToParams } from '@/utils/utils';
import { breadCrumbsItemsProps } from './@types';

export const breadCrumbsItems = ({ name, id }: breadCrumbsItemsProps) => [
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: `${name}`
  },
  {
    path: '',
    label: 'Aportes'
  }
];
