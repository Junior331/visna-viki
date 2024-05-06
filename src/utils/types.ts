// import { v4 as uuidv4 } from 'uuid';

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
export type landSummaryType = {
  id: number;
  area: number;
  frontage: number;
  projectId: number;
  addressId: number;
  totalAmount: number;
  amountPerMeter: number;
  topographyTypeId: number;
  zoning: string;
  address: {
    id: number;
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: null;
    state: string;
    country: string;
  };
};

export type unitSummaryType = {
  id: number;
  netAmount: string;
  isRemove?: boolean;
  unitTypeId: number;
  averageArea: string;
  unitQuantity: string;
  marketAmount: string;
  exchangeQuantity: string;
  totalExchangeArea: string;
  areaPrivativaTotal: string;
};

export type unitHubSummaryType = {
  id: number;
  netAmount: number;
  unitHubId: number;
  unitTypeId: number;
  averageArea: number;
  marketAmount: number;
  unitQuantity: number;
  exchangeQuantity: number;
  totalExchangeArea: number;
  areaPrivativaTotal: number;
};

export type unitType = {
  flooring: string;
  underground: string;
  unitPerFloor: string;
  averageSaleValue: string;
  totalToBeBuiltArea: string;
  totalValueNoExchange: string;
  totalUnitsInDevelopment: string;
  totalPrivateAreaQuantity: string;
  unit: unitSummaryType[];
};

export type unitHubType = {
  id: number;
  flooring: number;
  projectId: number;
  underground: number;
  unitPerFloor: number;
  averageSaleValue: number;
  totalToBeBuiltArea: number;
  totalValueNoExchange: number;
  totalUnitsInDevelopment: number;
  totalPrivateAreaQuantity: number;
  unit: unitHubSummaryType[];
};

export type deadlineType = {
  startDate: string;
  totalDeadlineInMonth: string;
  approvalDeadlineInMonth: string;
  constructionDeadlineInMonth: string;
};

export type deadlineSummaryType = {
  id: number;
  endDate: null;
  projectId: number;
  startDate: string;
  totalDeadlineInMonth: number;
  approvalDeadlineInMonth: number;
  constructionDeadlineInMonth: number;
  projectLaunchDeadlineInMonth: null;
};

export type projectDateType = {
  lands: landType;
  units: unitType;
  projectId: number;
  deadline: deadlineType;
};

export type projectInfoType = {
  id: number;
  projectName: string;
  unitHub: unitHubType;
  land: landSummaryType;
  deadline: deadlineSummaryType;
};

export type payloadUserType = {
  role: string;
  email: string;
  status: string;
  username: string;
  passwordHash: string;
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
    totalPrivateAreaQuantity: '',
    unit: [
      {
        id: 0,
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
  id: 0,
  netAmount: '',
  unitTypeId: 0,
  averageArea: '',
  unitQuantity: '',
  marketAmount: '',
  exchangeQuantity: '',
  totalExchangeArea: '',
  areaPrivativaTotal: ''
};

export const emptyProjectInfo: projectInfoType = {
  id: 0,
  projectName: '',
  unitHub: {
    id: 0,
    flooring: 0,
    projectId: 0,
    underground: 0,
    unitPerFloor: 0,
    totalValueNoExchange: 0,
    totalUnitsInDevelopment: 0,
    totalToBeBuiltArea: 0,
    averageSaleValue: 0,
    totalPrivateAreaQuantity: 0,
    unit: [
      {
        id: 0,
        unitTypeId: 0,
        averageArea: 0,
        marketAmount: 0,
        netAmount: 0,
        unitQuantity: 0,
        exchangeQuantity: 0,
        totalExchangeArea: 0,
        areaPrivativaTotal: 0,
        unitHubId: 0
      }
    ]
  },
  land: {
    id: 0,
    addressId: 0,
    topographyTypeId: 0,
    area: 0,
    frontage: 0,
    amountPerMeter: 0,
    totalAmount: 0,
    projectId: 0,
    zoning: '',
    address: {
      id: 0,
      zipCode: '',
      street: '',
      number: '',
      neighborhood: '',
      city: null,
      state: '',
      country: ''
    }
  },
  deadline: {
    id: 0,
    projectId: 0,
    totalDeadlineInMonth: 0,
    approvalDeadlineInMonth: 0,
    constructionDeadlineInMonth: 0,
    projectLaunchDeadlineInMonth: null,
    startDate: '',
    endDate: null
  }
};
