import { mocks } from '@/services/mocks';
import { listExpenseTypes } from '@/services/services';

const generateMockData = () => mocks.bills;

export const getBills = async (isMock: boolean) => {
  try {
    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = generateMockData();
      return mockData;
    } else {
      const response = await listExpenseTypes();
      return response;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
