import { useContext, useState } from 'react';
import { Zoom, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Card } from '../Card';
import { Props } from './@types';
import { images } from '@/assets/images';
import { statusColor } from '@/utils/types';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import { GenericModal } from '../GenericModal';
import { SnackbarContext } from '@/contexts/Snackbar';
import useColorManipulation from '@/hooks/lightenColo';
import { handleDeleteProject } from '@/pages/EditProject/utils';
import * as S from './ProjectStyled';

const Project = ({
  id,
  text,
  name,
  status,
  progress,
  setIsUpdate,
  handleClick
}: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
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
      <S.Footer>
        <Button
          size="30px"
          $isOutline
          className="btnDelete"
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
        >
          <S.Icon src={icons.trash} alt="Icon trash" />
        </Button>

        <S.Text>concluido {progress}%</S.Text>
      </S.Footer>

      <GenericModal
        open={openModal}
        maxWidth={'650px'}
        maxHeight={'300px'}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage onClick={(e) => e.stopPropagation()}>
          <S.Icon src={icons.AlertTriangle} alt="Icon alert triangle" />
          <S.Title color="#000">Deletar</S.Title>
          <S.Text color="#000">
            Tem certeza de que deseja excluir este projeto?
          </S.Text>
          <S.ContainerButtons>
            <Button
              size="100px"
              disabled={loading}
              className="btnDelete"
              onClick={() => setOpenModal(false)}
            >
              Não
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              size="100px"
              onClick={() => {
                handleDeleteProject({
                  id,
                  navigate,
                  setLoading,
                  setSnackbar,
                  setIsUpdate,
                  setOpenModal,
                  setIsDelete: () => {}
                });
              }}
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </Card>
  );
};

export { Project };
