import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, IconButton, Link, Typography } from '@mui/material';
import { HeaderBreadcrumbsProps } from './@types';
import { GenericModal } from '@/components/modules';
import { Button } from '@/components/elements';
import * as S from './HeaderBreadcrumbsStyled';
import { icons } from '@/assets/images/icons';
import { HomeRounded } from '@mui/icons-material/';
import { Tooltip } from '@/components/elements/Tooltip';

const HeaderBreadcrumbs = ({
  breadcrumbs,
  stateParams
}: HeaderBreadcrumbsProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [pathActive, setPathActive] = useState('');

  const handleBreadcrumbClick = (path: string) => {
    if (path) {
      setOpenModal(true);
      setPathActive(path);
    }
  };

  const emptyComponent = (index: number, path: string) => {
    if (index === breadcrumbs.length - 1 || !path) {
      return 'span';
    } else {
      return Link;
    }
  };

  return (
    <S.ContainerBreadcrumbs>
      <Tooltip title={'Voltar para home'}>
        <IconButton
          size="large"
          aria-label="home"
          onClick={() => navigate('/home')}
        >
          <HomeRounded fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {breadcrumbs.map(({ path, label }, index) => (
          <Typography
            key={label}
            component={emptyComponent(index, path)}
            dangerouslySetInnerHTML={{ __html: label }}
            onClick={() => handleBreadcrumbClick(path)}
          />
        ))}
      </Breadcrumbs>

      <GenericModal
        maxWidth={'650px'}
        maxHeight={'300px'}
        open={openModal}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Icon src={icons.AlertTriangle} alt="Icon alert triangle" />
          <S.Title>Cancelar</S.Title>
          <S.Text>Você perderá as alterações que ainda não foram salvas</S.Text>
          <S.ContainerButtons>
            <Button
              size="100px"
              className="btnDeleteSolid"
              onClick={() => setOpenModal(false)}
            >
              Não
            </Button>
            <Button
              size="100px"
              onClick={() =>
                navigate(pathActive, {
                  state: stateParams
                })
              }
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </S.ContainerBreadcrumbs>
  );
};

export default HeaderBreadcrumbs;
