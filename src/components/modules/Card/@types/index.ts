export type Props = {
  text: string;
  name: string;
  progress: number;
  status: 'Done' | 'In Progress' | 'To Do' | 'In Review' | 'Block' | string;
};
export type styledProps = {
  color: string;
  bgColor: string;
};
