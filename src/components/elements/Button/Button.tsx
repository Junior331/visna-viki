import { CircularProgress } from '@mui/material';
import { Props } from './@types';
import * as S from './ButtonStyled';

const Button = ({
  type = 'button',
  onClick,
  loading,
  children,
  className,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <S.Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {loading ? <CircularProgress /> : <>{children}</>}
    </S.Button>
  );
};

export { Button };
