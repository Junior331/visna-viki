import axios from 'axios';
import {
  deadlineType,
  handleExpenseProps,
  landType,
  payloadExpense,
  payloadExpenseType,
  payloadUserType,
  unitType
} from '@/utils/types';
import { ENDPOINTS } from '@/utils/endpoints';

const token = window.sessionStorage.getItem('TOKEN');

// crud Units
export const createUnits = async (projectId: number, payload: unitType) => {
  const formattedUnits = payload.unit.map((unit) => ({
    unitTypeId: unit.unitTypeId,
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
export const editUnits = async (
  projectId: number,
  UnitId: string,
  payload: unitType
) => {
  const body = {
    projectId,
    ...payload
  };
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.UNITS.BASE_URL}/${UnitId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
    zoning: parseFloat(payload.zoning),
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
export const editLands = async (
  projectId: number,
  landId: number,
  payload: landType
) => {
  const body = {
    projectId,
    ...payload
  };
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.LANDS.BASE_URL}/${landId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
    totalDeadlineInMonth: parseFloat(payload.totalDeadlineInMonth.toString()),
    approvalDeadlineInMonth: parseFloat(
      payload.approvalDeadlineInMonth.toString()
    ),
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
  projectId: number,
  deadlineId: number,
  payload: landType
) => {
  const body = {
    projectId,
    ...payload
  };
  try {
    const response = await axios.patch(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.DEADLINE.BASE_URL}/${deadlineId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
  page,
  perPage,
  projectId
}: handleExpenseProps) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.EXPENSE.BASE_URL}/all/${projectId}?page=${page}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
