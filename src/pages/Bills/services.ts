import { listExpenseTypes, listAllExpenseByProject } from '@/services/services';

export const getBills = async () => {
  try {
    const response = await listExpenseTypes();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const getCostsByProject = async (id: number) => {
  try {
    const response = await listAllExpenseByProject({ projectId: id });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
