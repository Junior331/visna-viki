/* eslint-disable @typescript-eslint/no-explicit-any */
import { rowData } from '@/components/modules/TableBody/@types';
import { columnType } from '@/components/modules/TableHeader/@types';
import { genericV2ObjType } from '@/pages/Bills/@types';

export type Props = {
  formik?: any;
  rows: rowData[];
  isEdit?: boolean;
  isDelete?: boolean;
  className?: string;
  expenseActive?: any;
  columns: columnType[];
  cost?: genericV2ObjType;
  handleEdit?: (item: any) => void;
};
