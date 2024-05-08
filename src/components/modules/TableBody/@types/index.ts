export type rowType = {
  id: string;
  label: string;
};
export type rowData = Record<string, string | number>;

export type Props = {
  rows: rowData[];
  isEdit?: boolean;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
};
