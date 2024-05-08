import { billType } from '@/pages/Bills/@types';
import {
  projectDateType,
  projectInfoType,
  projectType,
  unitSummaryType
} from './types';

export const emptyProject: projectType = {
  id: '',
  name: '',
  text: '',
  status: '',
  progress: 0
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

export const emptyBills: billType = {
  bills: [
    {
      id: '',
      total: 0,
      name: '',

      expenses: [
        {
          id: '',
          name: '',
          value: 0,
          sub_expenses: [
            {
              id: '',
              name: '',
              value: 0
            }
          ]
        }
      ]
    },
    {
      id: '',
      total: 0,
      name: '',

      expenses: [
        {
          id: '',
          name: '',
          value: 0,
          sub_expenses: [
            {
              id: '',
              name: '',
              value: 0
            }
          ]
        }
      ]
    }
  ],
  total: 0
};
