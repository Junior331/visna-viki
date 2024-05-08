import { ReactNode } from 'react';

export type Props = {
  key: string;
  children: ReactNode;
  align?: 'inherit' | 'center' | 'left' | 'right' | 'justify';
};
export type styledProps = {
  width: string;
  height: string;
};
