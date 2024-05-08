import { rowData } from '@/components/modules/TableBody/@types';
import { columnType } from '@/components/modules/TableHeader/@types';

export type Props = {
  rows: rowData[];
  isEdit?: boolean;
  columns: columnType[];
};
