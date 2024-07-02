import { useContext, useState } from 'react';
import {
  Box,
  Zoom,
  Menu,
  Divider,
  Tooltip,
  MenuItem,
  IconButton,
  ListItemIcon
} from '@mui/material';
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
import { handleClickMenu, handleCloseMenu } from '@/utils/utils';
import * as S from './ProjectStyled';

const Project = ({ id, text, name, status, progress, handleClick }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { lighterColor } = useColorManipulation({
    color: statusColor[status as keyof typeof statusColor]
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Card width={'254px'} height={'auto'} className="noClick">
      <S.Header>
        <Tooltip title={name} arrow TransitionComponent={Zoom}>
          <S.Title>{name}</S.Title>
        </Tooltip>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            aria-controls={open ? 'account-menu' : undefined}
            onClick={(event) => {
              handleClickMenu({ event, setAnchorEl });
            }}
          >
            <S.Icon src={icons.menu} alt="Icon menu" />
          </IconButton>
        </Box>

        <Menu
          open={open}
          id="account-menu"
          anchorEl={anchorEl}
          className="menuEdit billsMenu"
          onClick={() => handleCloseMenu({ setAnchorEl })}
          onClose={() => handleCloseMenu({ setAnchorEl })}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom'
          }}
        >
          <MenuItem className="status" onClick={(e) => e.stopPropagation()}>
            Status:
            <S.Status
              bgColor={lighterColor}
              color={statusColor[status as keyof typeof statusColor]}
            >
              {status}
            </S.Status>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClick}>
            Editar
            <ListItemIcon>
              <S.Icon src={icons.edit} alt="Icon edit" />
            </ListItemIcon>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setOpenModal(true)}>
            Deletar
            <ListItemIcon>
              <S.Icon src={icons.trash} alt="Icon trash" />
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </S.Header>
      <S.Img src={images.ProjectTest} alt="project image" />
      <S.Text>{text}</S.Text>
      <S.ContainerProgress>
        <S.Text>concluido {progress}%</S.Text>
      </S.ContainerProgress>

      <GenericModal
        open={openModal}
        maxWidth={'650px'}
        maxHeight={'300px'}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
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
              onClick={() =>
                handleDeleteProject({
                  id,
                  navigate,
                  setLoading,
                  setSnackbar,
                  setOpenModal,
                  setIsDelete: () => {}
                })
              }
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
