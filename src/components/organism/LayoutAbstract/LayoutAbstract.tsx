import { GlobalStyles } from '@/styles/globalStyled';
import { LayoutProps } from './@types';
import * as S from './LayoutAbstractStyled';
import { images } from '@/assets/images';
import { Snackbar } from '@/components/modules';

const LayoutAbstract = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <GlobalStyles />
      <Snackbar />
      <S.ContainerAbstract>
        <S.Img src={images.Illustration} alt="Image Illustration" />
      </S.ContainerAbstract>
      <S.LayoutContent>
        <div className="children">{children}</div>
      </S.LayoutContent>
    </S.LayoutContainer>
  );
};

export default LayoutAbstract;
