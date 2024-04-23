import axios from 'axios';
import { getInfoUserProps, signInProps } from './@types';
import { ENDPOINTS } from '@/utils/endpoints';
import { images } from '@/assets/images';

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.AUTH_LOGIN}`,
      {
        email,
        password
      }
    );
    console.log();
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const getInfoUser = async ({
  setUser,
  accessToken
}: getInfoUserProps) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.GET_AUTH_USER}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    setUser({
      avatar: images.fallback,
      id: response.data.iduser,
      role: response.data.role,
      email: response.data.email,
      username: response.data.username
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
