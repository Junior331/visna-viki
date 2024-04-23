export enum statusColor {
  'Done' = '#28c76f',
  'To Do' = '#FF9F43',
  'Block' = '#EA5455',
  'In Review' = '#00CFE8',
  'In Progress' = '#7367F0'
}

export type projectType = {
  id: string;
  name: string;
  text: string;
  status: string;
  progress: number;
};
