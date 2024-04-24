export enum statusColor {
  'Done' = '#28c76f',
  'To Do' = '#FF9F43',
  'Block' = '#EA5455',
  'In Review' = '#00CFE8',
  'In Progress' = '#7367F0'
}

export type projectType = {
  id: string;
  name: string;
  text: string;
  status: string;
  progress: number;
};

export type landType = {
  name: string;
  area: number;
  state: string;
  zoning: string;
  number: string;
  street: string;
  zipCode: string;
  country: string;
  frontage: number;
  totalAmount: number;
  neighborhood: string;
  amountPerMeter: number;
  topographyTypeId: number;
};
export type unitType = {
  area: string;
  flooring: string;
  netAmount: string;
  underground: string;
  unitPerFloor: string;
  unitQuantity: string;
  totalBuiltArea: string;
  totalPrivateArea: string;
  exchangeQuantity: string;
  averageSaleValue: string;
  totalExchangeArea: string;
  totalToBeBuiltArea: string;
  areaPrivativaTotal: string;
  totalValueNoExchange: string;
  totalUnitsInDevelopment: string;
  totalPrivateAreaQuantity: string;
  unit: {
    unitTypeId: number;
    averageArea: string;
    marketAmount: string;
  };
};
export type deadlineType = {
  startDate: string;
  totalDeadlineInMonth: string;
  approvalDeadlineInMonth: string;
  constructionDeadlineInMonth: string;
};

export type projectDateType = {
  lands: landType;
  units: unitType;
  deadline: deadlineType;
};

export const emptyProjectDate: projectDateType = {
  lands: {
    area: 0,
    name: '',
    state: '',
    zoning: '',
    street: '',
    number: '',
    zipCode: '',
    country: '',
    frontage: 0,
    totalAmount: 0,
    neighborhood: '',
    amountPerMeter: 0,
    topographyTypeId: 0
  },
  units: {
    area: '',
    flooring: '',
    netAmount: '',
    underground: '',
    unitPerFloor: '',
    unitQuantity: '',
    totalBuiltArea: '',
    totalPrivateArea: '',
    averageSaleValue: '',
    exchangeQuantity: '',
    totalExchangeArea: '',
    areaPrivativaTotal: '',
    totalToBeBuiltArea: '',
    totalValueNoExchange: '',
    totalUnitsInDevelopment: '',
    totalPrivateAreaQuantity: '',
    unit: {
      unitTypeId: 0,
      averageArea: '',
      marketAmount: ''
    }
  },
  deadline: {
    startDate: '',
    totalDeadlineInMonth: '',
    approvalDeadlineInMonth: '',
    constructionDeadlineInMonth: ''
  }
};
