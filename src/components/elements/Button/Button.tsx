import { Props } from './@types';
import * as S from './ButtonStyled';

const Button = ({
  type = 'button',
  onClick,
  children,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <S.Button onClick={onClick} disabled={disabled} type={type} {...rest}>
      {children}
    </S.Button>
  );
};

export { Button };
