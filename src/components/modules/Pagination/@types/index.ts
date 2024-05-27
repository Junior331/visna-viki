import { PaginationProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export type Props = PaginationProps & {
  page: number;
  perPage: number;
  pageTotal: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
  setPageTotal: Dispatch<SetStateAction<number>>;
};
