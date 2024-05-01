import { Dispatch, ReactNode } from 'react';

export type Props = {
  open: boolean;
  maxWidth?: string;
  maxHeight?: string;
  children: ReactNode;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};
export type styledProps = {
  maxWidth?: string;
  maxHeight?: string;
};
