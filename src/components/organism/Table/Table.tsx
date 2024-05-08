import { Paper, TableContainer, Table as MuiTable } from '@mui/material';
import * as S from './TableStyled';
import { TableBody, TableHeader } from '@/components/modules';
import { Props } from './@types';

const Table = ({ columns, rows, isEdit }: Props) => {
  return (
    <S.TableContainer>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHeader columns={columns} />
          <TableBody rows={rows} isEdit={isEdit} />
        </MuiTable>
      </TableContainer>
    </S.TableContainer>
  );
};

export { Table };
