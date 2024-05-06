import { useContext, useEffect } from 'react';
import { LayoutProps } from './@types';
import { Snackbar } from '@/components/modules';
import { GlobalStyles } from '@/styles/globalStyled';
import * as S from './LayoutStyled';
import { getInfoUser } from '@/pages/SignIn/services';
import { UserContext } from '@/state/user/state';

const Layout = ({ children }: LayoutProps) => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const accessToken = window.sessionStorage.getItem('TOKEN');
    if (accessToken) {
      getInfoUser({ dispatch, accessToken });
    }
  }, [dispatch]);

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
