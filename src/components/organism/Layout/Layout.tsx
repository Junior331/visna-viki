import { LayoutProps } from './@types';
import { Snackbar } from '@/components/modules';
import { GlobalStyles } from '@/styles/globalStyled';
import * as S from './LayoutStyled';

const Layout = ({ children }: LayoutProps) => {
  // const navigate = useNavigate();
  // const { dispatch } = useContext(UserContext);

  // useEffect(() => {
  //   const accessToken = getToken();
  //   if (accessToken) {
  //     getInfoUser({ dispatch });
  //   } else {
  //     navigate('/');
  //   }
  // }, [dispatch, navigate]);

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
