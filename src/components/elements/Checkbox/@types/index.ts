import { MouseEvent } from 'react';

export type Props = {
  label?: string;
  checked?: boolean;
  onClick?: (e: MouseEvent) => void;
};
