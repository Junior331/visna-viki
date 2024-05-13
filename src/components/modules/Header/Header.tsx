/* eslint-disable no-irregular-whitespace */
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Divider,
  ListItemIcon,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select
} from '@mui/material';
import {
  Logout,
  PersonAdd,
  Visibility,
  MenuOutlined,
  VisibilityOff,
  KeyboardArrowDownRounded
} from '@mui/icons-material';

import { Menu } from '@/components/organism';
import { MenuContext } from '@/contexts/Menu';
import UseInitials from '@/hooks/useInitials';
import { handleCreateUser } from './services';
import { GenericModal } from '../GenericModal';
import { UserContext } from '@/state/user/state';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { handleLogout } from './utils';
import { handleClickMenu, handleCloseMenu } from '@/utils/utils';
import * as S from './HeaderStyled';

const Header = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const [avatarImg, setAvatar] = useState('J');
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { isOpen, setIsOpen } = useContext(MenuContext);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const initials = UseInitials(avatarImg);

  const formik = useFormik({
    initialValues: {
      role: '',
      email: '',
      status: '',
      username: '',
      passwordHash: ''
    },
    onSubmit: async (values) => {
      handleCreateUser({ values, setOpenModal, setSnackbar });
    }
  });
  const { values, handleSubmit, setFieldValue, handleChange } = formik;

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
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            aria-controls={open ? 'account-menu' : undefined}
            onClick={(e) => handleClickMenu({ event: e, setAnchorEl })}
          >
            <Avatar sx={{ width: 50, height: 50 }}>{initials}</Avatar>
          </IconButton>
        </Box>

        <MuiMenu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClick={() => handleCloseMenu({ setAnchorEl })}
          onClose={() => handleCloseMenu({ setAnchorEl })}
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
          <MenuItem onClick={() => handleCloseMenu({ setAnchorEl })}>
            <Avatar /> Perfil
          </MenuItem>
          <Divider />
          {state.user.role === 'ADMIN' && (
            <MenuItem
              onClick={() => {
                setOpenModal(true);
                handleCloseMenu({ setAnchorEl });
              }}
            >
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Criar outra conta
            </MenuItem>
          )}
          <MenuItem onClick={() => handleLogout({ setAnchorEl, navigate })}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </MuiMenu>
      </S.InfoUser>

      <GenericModal
        maxWidth={'1000px'}
        maxHeight={'560px'}
        open={openModal}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Title>Novo usuario</S.Title>
          <S.Text>
            Bem-vindo ao processo de criação de novos usuários. Este modal
            permite que um administrador adicione novos usuários. Ao preencher
            os campos abaixo, você estará concedendo acesso aos recursos e
            funcionalidades do sistema.
          </S.Text>
          <S.Form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 0 }} margin={0}>
              <S.ContainerInputs container spacing={{ xs: 0, sm: 0 }}>
                <Grid item xs={12} sm={5.8} md={5.8} minWidth={250}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Nome</S.Label>
                    <Input
                      required
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                      aria-describedby="username"
                      placeholder="Digite seu nome"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} minWidth={250}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Email</S.Label>
                    <Input
                      required
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      aria-describedby="email"
                      placeholder="Digite seu email"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      onKeyUp={() => {
                        setFieldValue(
                          'email',
                          values.email.replace('/s/g', '')
                        );
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} minWidth={250}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Status</S.Label>
                    <Select
                      required
                      id="status"
                      displayEmpty
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={''} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      <MenuItem value={'ACTIVE'}>Ativo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} minWidth={250}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Permissão</S.Label>
                    <Select
                      required
                      id="role"
                      displayEmpty
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={''} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      <MenuItem value={'ADMIN'}>Admin</MenuItem>
                      <MenuItem value={'USER'}>User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} minWidth={250}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Senha</S.Label>
                    <Input
                      required
                      id="passwordHash"
                      variant="outlined"
                      onChange={handleChange}
                      typeElement={OutlinedInput}
                      value={values.passwordHash}
                      placeholder="Digite sua senha"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      type={`${passwordShow ? 'text' : 'password'}`}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={() => setPasswordShow(!passwordShow)}
                          >
                            {passwordShow ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </S.ContainerInputs>
            </Grid>
            <S.ContainerButtons>
              <Button
                $isOutline
                size="80px"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>
              <Button size="100px" type="submit">
                Criar
              </Button>
            </S.ContainerButtons>
          </S.Form>
        </S.ContainerMessage>
      </GenericModal>
    </S.Header>
  );
};

export { Header };
