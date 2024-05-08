import { Props } from './@types';
import * as S from './CardStyled';

const Card = ({ width, height, handleClick, children, className }: Props) => {
  return (
    <S.CardContainer
      width={width}
      height={height}
      className={className}
      onClick={handleClick}
    >
      {children}
    </S.CardContainer>
  );
};

export { Card };
