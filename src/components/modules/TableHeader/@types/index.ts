export type columnType = {
  label: string;
  description?: string;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
};
export type Props = {
  columns: columnType[];
};
