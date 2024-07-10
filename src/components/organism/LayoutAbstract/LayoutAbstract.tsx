import { LayoutProps } from './@types';
import { Snackbar } from '@/components/modules';
import { GlobalStyles } from '@/styles/globalStyled';
import * as S from './LayoutAbstractStyled';
import { images } from '@/assets/images';

const LayoutAbstract = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <GlobalStyles />
      <Snackbar />
      <S.Header>
        <S.Img src={images.logoVisna} alt="Image logo Visna" />
      </S.Header>
      <S.Content>
        <S.ContainerAbstract>
          <S.Text>
            <S.Span>
              Olá, <br />
            </S.Span>{' '}
            Acompanhe os projetos da <S.Span>VISNA</S.Span>
          </S.Text>
        </S.ContainerAbstract>
        <S.LayoutContent>
          <div className="children">
            {children}
            <S.Footer>
              <S.Text size="2">
                By clicking continue, you agree to our{' '}
                <S.Span color="#000">Terms of Service</S.Span> and{' '}
                <S.Span color="#000"> Privacy Policy</S.Span>{' '}
              </S.Text>
            </S.Footer>
          </div>
        </S.LayoutContent>
      </S.Content>
    </S.LayoutContainer>
  );
};

export default LayoutAbstract;
