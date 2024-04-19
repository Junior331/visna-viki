import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';

export const getProjects = async () => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}/${ENDPOINTS.PROJECTS.GET_PROJECT}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
