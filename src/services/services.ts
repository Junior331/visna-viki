import axios from 'axios';
import {
  CepData,
  deadlineSummaryType,
  deadlineType,
  handleExpenseProps,
  landSummaryType,
  landType,
  payloadExpense,
  payloadExpenseType,
  payloadUserType,
  unitHubType,
  unitType
} from '@/utils/types';
import { ENDPOINTS } from '@/utils/endpoints';
import { getToken } from './sessionStorage';
import { cleanObject } from '@/utils/utils';

// crud Units
export const createUnits = async (projectId: number, payload: unitType) => {
  const formattedUnits = payload.unit.map((unit) => ({
    unitTypeId: unit.unitTypeId,
    totalAreaOfTheDevelopment: 1,
    totalPrivateAreaNetOfExchange: 1,
    unitCharacteristicsId: unit.unitCharacteristicsId,
    netAmount: parseFloat(unit.netAmount.replace(',', '.')),
    averageArea: parseFloat(unit.averageArea.replace(',', '.')),
    marketAmount: parseFloat(unit.marketAmount.replace(',', '.')),
    unitQuantity: parseFloat(unit.unitQuantity.replace(',', '.')),
    exchangeQuantity: parseFloat(unit.exchangeQuantity.replace(',', '.')),
    totalExchangeArea: parseFloat(unit.totalExchangeArea.replace(',', '.')),
    areaPrivativaTotal: parseFloat(unit.areaPrivativaTotal.replace(',', '.'))
  }));

  const formatPayload = {
    ...payload,
    unit: formattedUnits,
    totalAreaOfTheDevelopment: 1,
    totalPrivateAreaNetOfExchange: 1,
    flooring: parseFloat(payload.flooring.toString()),
    underground: parseFloat(payload.underground.toString()),
    unitPerFloor: parseFloat(payload.unitPerFloor.toString()),
    totalValueNoExchange: parseFloat(payload.totalValueNoExchange),
    averageSaleValue: parseFloat(payload.averageSaleValue.toString()),
    totalToBeBuiltArea: parseFloat(payload.totalToBeBuiltArea.toString())
  };

  const body = {
    ...formatPayload,
    projectId
  };

  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.UNITS.BASE_URL}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteUnits = async (unitId: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.UNITS.BASE_URL}/${unitId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const editUnits = async (unitId: number, payload: unitHubType) => {
  const formatedListUnit = payload.unit.map((item) => {
    const newObj = {
      ...item,
      marketAmount: parseFloat(item.marketAmount.toString())
    };
    return newObj;
  });

  const body = {
    ...payload,
    unit: formatedListUnit.map(cleanObject)
  };
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.UNITS.BASE_URL}/${unitId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listUnits = async (unitId: number) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.UNITS.BASE_URL}/${unitId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listUnitCharacteristics = async () => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.UNITS.BASE_URL}/characteristics`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// crud Lands
export const createLands = async (projectId: number, payload: landType) => {
  const formatPayload = {
    ...payload,
    area: parseFloat(payload.area.toString()),
    frontage: parseFloat(payload.frontage.toString()),
    totalAmount: parseFloat(payload.totalAmount.toString()),
    amountPerMeter: parseFloat(payload.amountPerMeter.toString())
  };

  const body = {
    ...formatPayload,
    projectId: projectId
  };

  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.LANDS.BASE_URL}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteLands = async (landId: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.LANDS.BASE_URL}/${landId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const editLands = async (landId: number, payload: landSummaryType) => {
  const body = {
    ...payload
  };
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.LANDS.BASE_URL}/${landId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listLands = async (landId: number) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.LANDS.BASE_URL}/${landId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// crud Deadline
export const createDeadline = async (
  projectId: number,
  payload: deadlineType
) => {
  const formatPayload = {
    ...payload,
    totalDeadlineInMonth: payload.totalDeadlineInMonth,
    constructionDeadlineInMonth: parseFloat(
      payload.constructionDeadlineInMonth.toString()
    )
  };

  const body = {
    ...formatPayload,
    projectId
  };
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.DEADLINE.BASE_URL}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteDeadline = async (deadlineId: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.DEADLINE.BASE_URL}/${deadlineId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const editDeadline = async (
  deadlineId: number,
  payload: deadlineSummaryType
) => {
  const body = {
    ...payload
  };
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.DEADLINE.BASE_URL}/${deadlineId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listDeadline = async (deadlineId: number) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.DEADLINE.BASE_URL}/${deadlineId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// crud project
export const createProject = async (name: string) => {
  const payload = {
    projectName: name
  };

  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteProject = async (projectId: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const editProject = async (projectId: number, name: string) => {
  const payload = {
    projectName: name
  };
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}/${projectId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listProject = async (projectId: number) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// crud user
export const createUser = async (payload: payloadUserType) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.BASE_URL}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.BASE_URL}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const editUser = async (userId: number) => {
  const payload = {};
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.BASE_URL}/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listUser = async (userId: number) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.BASE_URL}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listAllUser = async () => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.BASE_URL}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// crud expense
export const listAllExpenseByProject = async ({
  page = 1,
  perPage = 1000,
  projectId
}: handleExpenseProps) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/all/${projectId}?page=${page}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const listExpenseById = async (id: number) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const createExpense = async (payload: payloadExpense) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const editExpense = async (id: number, payload: payloadExpense) => {
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteExpense = async (id: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// crud expense types
export const listExpenseTypes = async () => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/types`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const createExpenseTypes = async (payload: payloadExpenseType) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/types`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const editExpenseTypes = async (
  id: number,
  payload: payloadExpenseType
) => {
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/types/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteExpenseTypes = async (id: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/types/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// crud aportes
export const getAportesByProject = async (
  id: number,
  page: number,
  perPage: number
) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.APORTES.BASE_URL}/all/${id}?page=${page}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAporte = async (payload: any) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.APORTES.BASE_URL}/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editAportes = async (id: number, payload: any) => {
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.APORTES.BASE_URL}/edit/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const deleteAportes = async (id: number) => {
  try {
    const response = await axios.delete(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.APORTES.BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const fetchCepData = async (cep: string) => {
  try {
    const response = await axios.get<CepData>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
