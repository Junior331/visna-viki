import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';
import { mocks } from '@/services/mocks';

const generateMockData = () => mocks.projects;

export const getProjects = async (isMock: boolean) => {
  try {
    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = generateMockData();
      return mockData;
    } else {
      const response = await axios.get(
        `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.GET_PROJECT}`
      );
      return response.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
