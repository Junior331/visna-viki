import { Snackbar } from '@/components/modules';
import { GlobalStyles } from '@/styles/globalStyled';
import { LayoutProps } from './@types';
import * as S from './LayoutStyled';

const Layout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <GlobalStyles />
      <Snackbar />
      <S.LayoutContent>
        <S.Container>{children}</S.Container>
      </S.LayoutContent>
    </S.LayoutContainer>
  );
};

export default Layout;
