import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';
import { getToken } from '@/services/sessionStorage';

export const getDetailsBill = async () => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}`,
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
