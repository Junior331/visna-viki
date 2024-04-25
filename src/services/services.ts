import axios from 'axios';
import {
  Country,
  State,
  deadlineType,
  landType,
  unitType
} from '@/utils/types';
import { ENDPOINTS } from '@/utils/endpoints';

const token = window.sessionStorage.getItem('TOKEN');

export async function getCountries(): Promise<Country[]> {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countriesData = response.data;

    const countries: Country[] = countriesData
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((country: any) => ({
        fifa: country.fifa,
        name: country.name.common,
        capital: country.capital?.[0] || 'N/A',
        population: country.population || 0
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );

    return countries;
  } catch (error) {
    console.error('Erro ao obter dados dos países:', error);
    throw error;
  }
}

export async function getStatesByCountry(
  countryName: string
): Promise<State[]> {
  try {
    const response = await axios.get(
      `https://api.first.org/data/v1/countries/${countryName}/states`
    );

    const statesData = response.data;
    const states: State[] = statesData
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((state: any) => ({
        name: state.name
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );

    return states;
  } catch (error) {
    console.error(`Erro ao obter os estados de ${countryName}:`, error);
    throw error;
  }
}

// crud Units done
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

// crud project done
export const createProject = async (name: string) => {
  const payload = {
    projectName: name
  };
  const tokenV2 = window.sessionStorage.getItem('TOKEN');

  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${tokenV2}`
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
