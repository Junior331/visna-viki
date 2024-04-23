import axios from 'axios';
import { signUpProps } from './@types';
import { ENDPOINTS } from '@/utils/endpoints';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3RlIERFViBUIiwiZW1haWwiOiJ0ZXN0ZUBkZXYuY29tIiwiaWF0IjoxNzEzNDk3Mjk3LCJleHAiOjE3MTM0OTc1OTcsImF1ZCI6ImJhY2tvZmZpY2UtYXBpIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.rQuU-SYXBWBO5Iw0MJvjsfOUGf6gGUEhVApcOV_wG78`;

export const signUp = async ({
  email,
  password,
  username,
  role = 'ADMIN',
  status = 'ACTIVE'
}: signUpProps) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.USER.POST_USER}`,
      {
        email,
        password,
        username,
        role,
        status
      },
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
