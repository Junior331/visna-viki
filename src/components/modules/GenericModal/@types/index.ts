import { Dispatch, ReactNode } from 'react';

export type Props = {
  open: boolean;
  children: ReactNode;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};
