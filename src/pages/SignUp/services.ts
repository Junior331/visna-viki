import axios from 'axios';
import { signUpProps } from './@types';
import { ENDPOINTS } from '@/utils/endpoints';
import { getToken } from '@/services/sessionStorage';

export const signUp = async ({
  email,
  password,
  username,
  role = 'ADMIN',
  status = 'ACTIVE'
}: signUpProps) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.BASE_URL}`,
      {
        email,
        password,
        username,
        role,
        status
      },
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
