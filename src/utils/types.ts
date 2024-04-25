import { v4 as uuidv4 } from 'uuid';

export enum statusColor {
  'Done' = '#28c76f',
  'To Do' = '#FF9F43',
  'Block' = '#EA5455',
  'In Review' = '#00CFE8',
  'In Progress' = '#7367F0'
}

export enum MaskType {
  CEP = 'CEP',
  DATE = 'DATE',
  NUMBER = 'NUMBER'
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

export type unitSummaryType = {
  id: string;
  isRemove?: boolean;
  netAmount: string;
  unitTypeId: number;
  averageArea: string;
  unitQuantity: string;
  marketAmount: string;
  exchangeQuantity: string;
  totalExchangeArea: string;
  areaPrivativaTotal: string;
};

export type unitType = {
  flooring: string;
  underground: string;
  unitPerFloor: string;
  averageSaleValue: string;
  totalToBeBuiltArea: string;
  totalValueNoExchange: string;
  totalUnitsInDevelopment: string;
  unit: unitSummaryType[];
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
  projectId: number;
  deadline: deadlineType;
};

export type Country = {
  name: string;
  fifa: string;
  capital: string;
  population: number;
};

export type State = {
  name: string;
  fifa: string;
  capital: string;
  population: number;
};

export const emptyProjectDate: projectDateType = {
  projectId: 0,
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
    flooring: '',
    underground: '',
    unitPerFloor: '',
    averageSaleValue: '',
    totalToBeBuiltArea: '',
    totalValueNoExchange: '',
    totalUnitsInDevelopment: '',
    unit: [
      {
        id: '',
        netAmount: '',
        unitTypeId: 0,
        averageArea: '',
        unitQuantity: '',
        marketAmount: '',
        exchangeQuantity: '',
        totalExchangeArea: '',
        areaPrivativaTotal: ''
      }
    ]
  },
  deadline: {
    startDate: '',
    totalDeadlineInMonth: '',
    approvalDeadlineInMonth: '',
    constructionDeadlineInMonth: ''
  }
};

export const emptyUnitSummary: unitSummaryType = {
  id: uuidv4(),
  netAmount: '',
  unitTypeId: 0,
  averageArea: '',
  unitQuantity: '',
  marketAmount: '',
  exchangeQuantity: '',
  totalExchangeArea: '',
  areaPrivativaTotal: ''
};
