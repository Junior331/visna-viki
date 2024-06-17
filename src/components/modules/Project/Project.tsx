import { Tooltip, Zoom } from '@mui/material';
import { Card } from '../Card';
import { Props } from './@types';
import { images } from '@/assets/images';
import { statusColor } from '@/utils/types';
import useColorManipulation from '@/hooks/lightenColo';
import * as S from './ProjectStyled';

const Project = ({ text, name, status, progress, handleClick }: Props) => {
  const { lighterColor } = useColorManipulation({
    color: statusColor[status as keyof typeof statusColor]
  });

  return (
    <Card width={'254px'} height={'auto'} handleClick={handleClick}>
      <S.Header>
        <Tooltip title={name} arrow TransitionComponent={Zoom}>
          <S.Title>{name}</S.Title>
        </Tooltip>
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
      </S.ContainerProgress>
    </Card>
  );
};

export { Project };
