import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.FORGOT_PASSWORD}`,
      {
        email
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
