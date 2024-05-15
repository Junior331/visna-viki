import axios from 'axios';
import { getInfoUserProps, signInProps } from './@types';
import { ENDPOINTS } from '@/utils/endpoints';
import { Actions } from '@/state/user/@types/actions';
import { images } from '@/assets/images';
import { getToken } from '@/services/sessionStorage';

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
export const getInfoUser = async ({ dispatch }: getInfoUserProps) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.GET_AUTH_USER}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    dispatch({
      type: Actions.SET_USER_DATA,
      payload: {
        avatar: images.fallback,
        id: response.data.iduser,
        role: response.data.role,
        email: response.data.email,
        username: response.data.username
      }
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error ::', error);
      throw error;
    }
  }
};
