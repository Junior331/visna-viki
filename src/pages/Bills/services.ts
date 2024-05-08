import { mocks } from '@/services/mocks';
import { ENDPOINTS } from '@/utils/endpoints';
import axios from 'axios';

const generateMockData = () => mocks.bills;
const token = window.sessionStorage.getItem('TOKEN') || '';

export const getBills = async (isMock: boolean) => {
  try {
    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = generateMockData();
      return mockData;
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
