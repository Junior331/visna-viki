import { MouseEvent, ReactNode, RefObject } from 'react';

export type Props = {
  type?: string;
  loading?: boolean;
  disabled?: boolean;
  noActive?: boolean;
  children?: ReactNode;
  onClick?: (e: MouseEvent) => void;
  size: 'small' | 'medium' | 'large' | string;
};

export type StyledButtonProps = Props & {
  ref?: RefObject<HTMLButtonElement>;
};
