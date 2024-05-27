import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';
import { getToken } from '@/services/sessionStorage';

export const getAllProjects = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}?page=${page}&perPage=${perPage}`,
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
