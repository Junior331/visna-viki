import { Dispatch, SetStateAction } from 'react';

export type Props = {
  id: string;
  text: string;
  name: string;
  progress: number;
  handleClick: () => void;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  status: 'Done' | 'In Progress' | 'To Do' | 'In Review' | 'Block' | string;
};
export type styledProps = {
  color?: string;
  bgColor?: string;
};
