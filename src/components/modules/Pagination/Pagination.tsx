import { Props } from './@types';
import { MenuItem, Pagination as MuiPagination, Select } from '@mui/material';
import * as S from './PaginationStyled';
import { KeyboardArrowDownRounded } from '@mui/icons-material';

const Pagination = ({
  page,
  setPage,
  perPage,
  pageTotal,
  setPerPage
}: Props) => {
  return (
    <S.ContainerPagination>
      <MuiPagination
        page={page}
        color="primary"
        showLastButton
        showFirstButton
        count={pageTotal}
        onChange={(_e, index) => setPage(index)}
      />
      <Select
        id="perPage"
        displayEmpty
        name="perPage"
        value={perPage}
        className="SelectComponent"
        IconComponent={KeyboardArrowDownRounded}
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={(e) => setPerPage(e.target.value as number)}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={75}>75</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </S.ContainerPagination>
  );
};

export { Pagination };
