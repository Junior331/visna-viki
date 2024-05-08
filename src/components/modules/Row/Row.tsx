import { TableCell } from '@mui/material';
import { Props } from './@types';
import * as S from './RowStyled';

const Row = ({ key, align, children }: Props) => {
  return (
    <S.Container>
      <TableCell key={key} align={align}>
        {children}
      </TableCell>
    </S.Container>
  );
};

export { Row };
