/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createScenarios,
  deleteScenarios,
  listAllScenariosByProject,
  listAllStepsByProject
} from '@/services/services';
import {
  deleteScenarioProps,
  getListAllStepsProps,
  getListScenariosProps,
  postScenariosProps,
  stepsProps
} from './@types';

export const getListScenarios = async ({
  id,
  setLoading,
  setSnackbar,
  setListScenarios
}: getListScenariosProps) => {
  setLoading(true);
  try {
    const result = await listAllScenariosByProject({ projectId: id });
    setListScenarios(result);
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
export const getListAllSteps = async ({
  id,
  setLoading,
  setSnackbar,
  setListAllSteps
}: getListAllStepsProps) => {
  setLoading(true);
  try {
    const result = await listAllStepsByProject({ projectId: id });
    console.log('result ::', result)

    const groupedByStepName = result
      .filter((item: any) => item.step_name !== 'Aprovação do projeto' || item.step_name !== 'Aprova��o do projeto')
      .reduce((acc: any, item: any) => {
        if (!acc[item.step_name]) {
          acc[item.step_name] = [];
        }
        acc[item.step_name].push({
          id: item.id,
          date: item.date,
          stepName: item.step_name,
          project_id: item.project_id
        });
        return acc;
      }, {});

    const newList = Object.values(groupedByStepName) as stepsProps[][];
    console.log('newList ::', newList)

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
export const postScenarios = async ({
  id,
  payload,
  setLoading,
  setSnackbar,
  setNewScenarios,
  setListAllSteps,
  setListScenarios
}: postScenariosProps) => {
  setLoading(true);
  try {
    await createScenarios(payload);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      horizontal: 'right',
      severity: 'success',
      message: 'Cenário criado com sucesso'
    });
    setNewScenarios(false);
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
    getListScenarios({
      id,
      setLoading,
      setSnackbar,
      setListScenarios
    });
    getListAllSteps({
      id,
      setLoading,
      setSnackbar,
      setListAllSteps
    });
  }
};
export const deleteScenario = async ({
  id,
  idProject,
  setLoading,
  setSnackbar,
  setIsDelete,
  setOpenModal,
  setListAllSteps,
  setListScenarios
}: deleteScenarioProps) => {
  setLoading(true);
  setIsDelete(false);
  setOpenModal(false);
  try {
    await deleteScenarios(id);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      horizontal: 'right',
      severity: 'success',
      message: 'Cenário deletado com sucesso'
    });
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

    getListScenarios({
      setLoading,
      setSnackbar,
      id: idProject,
      setListScenarios
    });
    getListAllSteps({
      setLoading,
      setSnackbar,
      id: idProject,
      setListAllSteps
    });
  }
};
