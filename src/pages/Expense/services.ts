import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';

const token = window.sessionStorage.getItem('TOKEN') || '';

export const getDetailsBill = async () => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROJECTS.BASE_URL}`,
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
