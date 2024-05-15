import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutProps } from './@types';
import { Snackbar } from '@/components/modules';
import { UserContext } from '@/state/user/state';
import { GlobalStyles } from '@/styles/globalStyled';
import { getInfoUser } from '@/pages/SignIn/services';
import * as S from './LayoutStyled';

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const accessToken = window.sessionStorage.getItem('TOKEN');
    if (accessToken) {
      getInfoUser({ dispatch });
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

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
