import { GlobalStyles } from '@/styles/globalStyled';
import { LayoutProps } from './@types';
import * as S from './LayoutAbstractStyled';
import images from '@/assets/images';

const LayoutAbstract = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <GlobalStyles />
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
