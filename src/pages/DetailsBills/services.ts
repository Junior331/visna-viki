/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ENDPOINTS } from '@/utils/endpoints';
import { getToken } from '@/services/sessionStorage';
import { createExpense, listAllStepsByProject } from '@/services/services';
import { payloadExpense } from '@/utils/types';
import { getListAllStepsProps } from './@types';

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

export const createCost = async (payload: payloadExpense) => {
  try {
    const response = await createExpense(payload);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const getListAllSteps = async ({
  id,
  setLoading,
  setSnackbar,
  setListAllSteps
}: getListAllStepsProps) => {
  setLoading(true);
  try {
    const result = await listAllStepsByProject({ projectId: id });
    const newList = result.map((item: any) => {
      const obj = {
        id: item.id,
        date: item.date,
        stepName: item.step_name,
        project_id: item.project_id,
        project_name: item.project_name
      };
      return obj;
    });

    setListAllSteps(newList);
  } catch (error) {
    if (error instanceof Error) {
      setLoading(false);
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: error.message
      });
    }
  } finally {
    setLoading(false);
  }
};
