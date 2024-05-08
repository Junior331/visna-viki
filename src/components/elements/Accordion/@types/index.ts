import { ReactNode } from 'react';

export type Props = {
  title: string;
  isOpen: boolean;
  disabled?: boolean;
  children: ReactNode;
  handleClick?: () => void;
};
