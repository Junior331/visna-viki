import { TableCell, TableHead, TableRow } from '@mui/material';
import { Props } from './@types';

const TableHeader = ({ columns }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell align={column.align}>{column.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export { TableHeader };
