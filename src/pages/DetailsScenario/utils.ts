import { convertToParams } from '@/utils/utils';

export const breadCrumbsItems = (
  id: string,
  nameProject: string,
  name: string
) => [
  {
    path: `/edit?${convertToParams({ id, name: nameProject })}`,
    label: `${nameProject}`
  },
  {
    path: `/scenarios?${convertToParams({ id, name: nameProject })}`,
    label: 'Cenários de Venda'
  },
  {
    path: '',
    label: `${name}`
  }
];
