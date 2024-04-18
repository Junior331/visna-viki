import { GlobalStyles } from '@/styles/globalStyled';
import { LayoutProps } from './@types';
import * as S from './LayoutStyled';

const Layout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <GlobalStyles />
      <S.LayoutContent>
        <S.Container>{children}</S.Container>
      </S.LayoutContent>
    </S.LayoutContainer>
  );
};

export default Layout;
