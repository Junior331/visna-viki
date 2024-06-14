/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paper, TableContainer, Table as MuiTable } from '@mui/material';
import * as S from './TableStyled';
import { TableBody, TableHeader } from '@/components/modules';
import { Props } from './@types';

const Table = ({
  rows,
  cost,
  formik,
  isEdit,
  columns,
  className,
  expenseActive,
  handleEdit = () => {}
}: Props) => {
  return (
    <S.TableContainer>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHeader columns={columns} />
          <TableBody
            rows={rows}
            cost={cost}
            formik={formik}
            isEdit={isEdit}
            className={className}
            itemActive={expenseActive}
            handleEdit={(item) => handleEdit(item)}
          />
        </MuiTable>
      </TableContainer>
    </S.TableContainer>
  );
};

export { Table };
