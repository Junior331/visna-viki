/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUser } from '@/services/services';
import { handleCreateUserProps } from './@types';

export const handleCreateUser = async ({
  values,
  setOpenModal,
  setSnackbar
}: handleCreateUserProps) => {
  try {
    await createUser(values);
    setOpenModal(false);
    setSnackbar({
      isOpen: true,
      severity: 'success',
      vertical: 'top',
      horizontal: 'right',
      message: 'Usuário criado com sucesso'
    });
  } catch (error: any) {
    if (error) {
      const message = error?.response.data.message;
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: message
      });
      setOpenModal(false);
    }
  }
};
