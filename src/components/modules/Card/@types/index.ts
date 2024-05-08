import { ReactNode } from 'react';

export type Props = {
  width: string;
  height: string;
  className?: string;
  children: ReactNode;
  handleClick?: () => void;
};
export type styledProps = {
  width: string;
  height: string;
};
