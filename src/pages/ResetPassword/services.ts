import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';

export const resetPassword = async (password: string) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}/${ENDPOINTS.USER.RESET_PASSWORD}`,
      {
        password
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar trocar á senha do usuário:', error);
    throw error;
  }
};
