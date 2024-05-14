/* eslint-disable @typescript-eslint/no-explicit-any */
import { rowData } from '@/components/modules/TableBody/@types';
import { columnType } from '@/components/modules/TableHeader/@types';

export type Props = {
  formik?: any;
  rows: rowData[];
  isEdit?: boolean;
  columns: columnType[];
};
