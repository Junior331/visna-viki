import { ReactNode, createContext, useMemo, useState } from 'react';

export type Snackbar = {
  isOpen: boolean;
  message: string;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  severity: 'success' | 'info' | 'warning' | 'error';
};

type SnackbarContextType = {
  snackbar: Snackbar;
  closeSnackbar: () => void;
  resetSnackbar: () => void;
  setSnackbar: (snackbarData: Snackbar) => void;
};

const initialState: Snackbar = {
  message: '',
  isOpen: false,
  severity: 'info',
  vertical: 'bottom',
  horizontal: 'left'
};

export const SnackbarContext = createContext<SnackbarContextType>({
  setSnackbar: () => {},
  snackbar: initialState,
  resetSnackbar: () => {},
  closeSnackbar: () => {}
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<Snackbar>(initialState);

  const resetSnackbar = () => {
    setSnackbar(initialState);
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      isOpen: false
    }));
  };

  const value = useMemo(
    () => ({ snackbar, setSnackbar, resetSnackbar, closeSnackbar }),
    [snackbar, setSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
