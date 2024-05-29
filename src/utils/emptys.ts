import { costsType, costsTypeV2 } from '@/pages/Bills/@types';
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
    depave: false,
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
    projectLaunchDeadlineInMonth: 0,
    startDate: '',
    totalDeadlineInMonth: 0,
    approvalDeadlineInMonth: 0,
    constructionDeadlineInMonth: 0
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
        keyIndex: 0,
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
    depave: false,
    area: 0,
    addressId: 0,
    topographyTypeId: 0,
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
    projectLaunchDeadlineInMonth: 0,
    startDate: ''
  }
};

export const emptyCosts: costsType = {
  costs: {
    shallowCost: {
      id: 0,
      name: '',
      totalValue: 0,
      land: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 12 }, () => ({ id: 0, name: '' }))
      },
      project: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 5 }, () => ({ id: 0, name: '' }))
      },
      constructions: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 3 }, () => ({ id: 0, name: '' }))
      },
      Licenses: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 8 }, () => ({ id: 0, name: '' }))
      },
      AdministrativeCosts: {
        id: 0,
        name: ' ',
        totalValue: 0,
        expenses: Array.from({ length: 10 }, () => ({ id: 0, name: '' }))
      }
    },
    incorporationFee: {
      id: 0,
      name: '',
      totalValue: 0,
      administrateTax: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 1 }, () => ({ id: 0, name: '' }))
      }
    }
  }
};
export const emptyCostsV2: costsTypeV2 = {
  costs: {
    totalValue: 0,
    shallowCost: {
      id: 0,
      name: '',
      totalValue: 0,
      land: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 12 }, () => ({ id: 0, name: '' }))
      },
      project: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 5 }, () => ({ id: 0, name: '' }))
      },
      constructions: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 3 }, () => ({ id: 0, name: '' }))
      },
      Licenses: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 8 }, () => ({ id: 0, name: '' }))
      },
      AdministrativeCosts: {
        id: 0,
        name: ' ',
        totalValue: 0,
        expenses: Array.from({ length: 10 }, () => ({ id: 0, name: '' }))
      }
    },
    incorporationFee: {
      id: 0,
      name: '',
      totalValue: 0,
      administrateTax: {
        id: 0,
        name: '',
        totalValue: 0,
        expenses: Array.from({ length: 1 }, () => ({ id: 0, name: '' }))
      }
    }
  }
};
