import { handleTabsProps } from './@types';

export const unitSummaryDefault = {
  id: 0,
  netAmount: 0,
  unitHubId: 0,
  unitTypeId: 0,
  averageArea: 0,
  marketAmount: 0,
  unitQuantity: 0,
  exchangeQuantity: 0,
  totalExchangeArea: 0,
  areaPrivativaTotal: 0
};

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
