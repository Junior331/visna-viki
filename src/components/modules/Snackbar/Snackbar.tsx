import { useContext } from 'react';
import { Alert, AlertTitle, Snackbar as MuiSnackbar } from '@mui/material';
import { SnackbarContext } from '@/contexts/Snackbar';
import * as S from './SnackbarStyled';

const Snackbar = () => {
  const { snackbar, closeSnackbar } = useContext(SnackbarContext);

  return (
    <S.ContainerSnackbar>
      <MuiSnackbar
        open={snackbar.isOpen}
        autoHideDuration={2000}
        onClose={() => closeSnackbar()}
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal
        }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: '100%', minWidth: '280px' }}
        >
          <AlertTitle>{snackbar.severity}</AlertTitle>
          {snackbar.message}
        </Alert>
      </MuiSnackbar>
    </S.ContainerSnackbar>
  );
};

export { Snackbar };
