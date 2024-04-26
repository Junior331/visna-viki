import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Menu as MuiMenu,
  MenuItem,
  Divider,
  ListItemIcon
} from '@mui/material';
import { Logout, MenuOutlined, PersonAdd } from '@mui/icons-material';
import { Menu } from '@/components/organism';
import { MenuContext } from '@/contexts/Menu';
import UseInitials from '@/hooks/useInitials';
import { UserContext } from '@/state/user/state';
import { handleClick, handleClose, handleLogout } from './utils';
import * as S from './HeaderStyled';

const Header = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const { isOpen, setIsOpen } = useContext(MenuContext);
  const [avatarImg, setAvatar] = useState('J');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const initials = UseInitials(avatarImg);

  useEffect(() => {
    setAvatar(state.user.username);
  }, [state]);

  return (
    <S.Header>
      <div>
        <Menu />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuOutlined />
        </IconButton>
      </div>
      <S.InfoUser>
        <S.ContainerText>
          <S.Title>{state.user.username}</S.Title>
          <S.Text>{state.user.role}</S.Text>
        </S.ContainerText>
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <Tooltip title="Account settings">
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              aria-controls={open ? 'account-menu' : undefined}
              onClick={(e) => handleClick({ event: e, setAnchorEl })}
            >
              <Avatar sx={{ width: 50, height: 50 }}>{initials}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <MuiMenu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClick={() => handleClose({ setAnchorEl })}
          onClose={() => handleClose({ setAnchorEl })}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => handleClose({ setAnchorEl })}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleClose({ setAnchorEl })}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={() => handleLogout({ setAnchorEl, navigate })}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MuiMenu>
      </S.InfoUser>
    </S.Header>
  );
};

export { Header };
