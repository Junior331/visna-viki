import { handleTabsProps } from './@types';

export const breadCrumbsItems = (name: string) => [
  {
    path: '',
    label: 'Projetos'
  },
  {
    path: '',
    label: 'Editar projeto'
  },
  {
    path: '',
    label: `${name}`
  }
];

export const handleTabs = ({ setValue, newValue }: handleTabsProps) => {
  setValue(newValue);
};
