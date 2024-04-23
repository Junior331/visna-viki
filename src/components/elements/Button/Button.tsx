import { CircularProgress } from '@mui/material';
import { Props } from './@types';
import * as S from './ButtonStyled';

const Button = ({
  type = 'button',
  onClick,
  loading,
  children,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <S.Button onClick={onClick} disabled={disabled} type={type} {...rest}>
      {loading ? <CircularProgress /> : <>{children}</>}
    </S.Button>
  );
};

export { Button };
