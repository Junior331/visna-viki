import * as S from './CardStyled';
import { Props } from './@types';
import { images } from '@/assets/images';
import { ProgressBar } from '../ProgressBar';
import { statusColor } from '@/utils/types';
import useColorManipulation from '@/hooks/lightenColo';

const Card = ({ text, name, status, progress }: Props) => {
  const { lighterColor } = useColorManipulation({
    color: statusColor[status as keyof typeof statusColor]
  });

  return (
    <S.CardContainer>
      <S.Header>
        <S.Title>{name}</S.Title>
        <S.Status
          bgColor={lighterColor}
          color={statusColor[status as keyof typeof statusColor]}
        >
          {status}
        </S.Status>
      </S.Header>
      <S.Img src={images.ProjectTest} alt="project image" />
      <S.Text>{text}</S.Text>
      <S.ContainerProgress>
        <S.Text>concluido {progress}%</S.Text>
        <ProgressBar
          max={100}
          value={progress}
          bgColorMax={lighterColor}
          bgColorValue={statusColor[status as keyof typeof statusColor]}
        />
      </S.ContainerProgress>
    </S.CardContainer>
  );
};

export { Card };
