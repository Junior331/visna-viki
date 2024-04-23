import axios from 'axios';
import { getInfoUserProps, signInProps } from './@types';
import { ENDPOINTS } from '@/utils/endpoints';

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.AUTH_LOGIN}`,
      {
        email,
        password
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const getInfoUser = async ({ setUser }: getInfoUserProps) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.GET_AUTH_USER}`,
      {}
    );
    console.log('response ::', response);
    setUser({
      id: '',
      role: '',
      email: '',
      avatar: '',
      username: ''
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
