import axios from 'axios';
import { mocks } from '@/services/mocks';
import { emptyBills } from '@/utils/emptys';
import { subBillType } from '../Bills/@types';
import { ENDPOINTS } from '@/utils/endpoints';

const generateMockData = (id: string) => {
  const mockData = mocks.bills;
  const filteredData = mockData.bills.filter(
    (bill: subBillType) => bill.id === id
  );
  return filteredData.length > 0 ? filteredData[0] : null;
};

const token = window.sessionStorage.getItem('TOKEN') || '';

export const getDetailsBill = async (isMock: boolean, id: string) => {
  try {
    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = generateMockData(id);
      return mockData || emptyBills.bills[0];
    } else {
      const response = await axios.get(
        `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
