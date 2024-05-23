import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { HeaderBreadcrumbsProps } from './@types';
import { GenericModal } from '@/components/modules';
import { Button } from '@/components/elements';
import * as S from './HeaderBreadcrumbsStyled';
import { icons } from '@/assets/images/icons';

const HeaderBreadcrumbs = ({ breadcrumbs }: HeaderBreadcrumbsProps) => {
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
            <Button size="100px" onClick={() => setOpenModal(false)}>
              Não
            </Button>
            <Button size="100px" onClick={() => navigate(pathActive)}>
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </S.ContainerBreadcrumbs>
  );
};

export default HeaderBreadcrumbs;
