import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
  Box,
  Grid,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  Menu,
  ListItemIcon,
  Divider,
  Skeleton
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  convertToParams,
  handleClickMenu,
  handleCloseMenu
} from '@/utils/utils';
import { scenariosProps } from './@types';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Card, GenericModal } from '@/components/modules';
import {
  handleView,
  handleDelete,
  breadCrumbsItems,
  getListScenarios
} from './utils';
import { HeaderBreadcrumbs, Layout } from '@/components/organism';
import * as S from './ScenariosStyled';

export const Scenarios = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [newScenarios, setNewScenarios] = useState(false);
  const [listScenarios, setListScenarios] = useState<scenariosProps[]>([]);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const formik = useFormik({
    initialValues: {
      name: '',
      phase: 0,
      startType: 0,
      salesSpeed: '',
      startDateSales: ''
    },
    onSubmit: async (values) => {
      console.log('values ::', values);
    }
  });

  useEffect(() => {
    getListScenarios({
      setLoading,
      setSnackbar,
      setListScenarios,
      id: parseFloat(id)
    });
  }, [id, setSnackbar]);
  const { values, handleSubmit, handleChange, setFieldValue } = formik;
  return (
    <Layout>
      <S.ScenariosContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(id, name)} />
          <S.ContainerButtons>
            <Button $isOutline size="150px" onClick={() => setOpenModal(true)}>
              Voltar
            </Button>
            <Button size="200px" onClick={() => setNewScenarios(true)}>
              Novo Cenário
            </Button>
          </S.ContainerButtons>
        </S.Header>
        <S.Content>
          {loading ? (
            <Card width={'100%'} height={'auto'} className="bgWhite">
              <S.HeaderCard>
                <Skeleton height={20} width={'15%'} variant="rounded" />
                <Skeleton height={20} width={'10px'} variant="rounded" />
              </S.HeaderCard>
              <S.ContainerScenarios>
                <S.Scenario>
                  <Skeleton height={20} width={'15%'} variant="rounded" />
                  <Skeleton height={20} width={'5%'} variant="rounded" />
                </S.Scenario>
                <S.FooterScenario>
                  <Skeleton height={20} width={'15%'} variant="rounded" />
                  <Skeleton height={20} width={'5%'} variant="rounded" />
                </S.FooterScenario>
              </S.ContainerScenarios>
            </Card>
          ) : (
            <>
              {listScenarios.length ? (
                <S.ListScenarios>
                  <Card width={'100%'} height={'auto'} className="bgWhite">
                    <S.HeaderCard>
                      <S.Title>Cenário 01 </S.Title>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          textAlign: 'center'
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ ml: 2 }}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          aria-controls={open ? 'account-menu' : undefined}
                          onClick={(e) => {
                            handleClickMenu({ event: e, setAnchorEl });
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
                        <MenuItem
                          onClick={() =>
                            handleView({
                              name,
                              id: 1,
                              navigate,
                              idProject: id
                            })
                          }
                        >
                          Ver detalhes
                          <ListItemIcon>
                            <S.Icon src={icons.eye} alt="Icon eye" />
                          </ListItemIcon>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={() => {
                            setIsDelete(true);
                            setOpenModal(true);
                          }}
                        >
                          Deletar
                          <ListItemIcon>
                            <S.Icon src={icons.trash} alt="Icon trash" />
                          </ListItemIcon>
                        </MenuItem>
                      </Menu>
                    </S.HeaderCard>
                    <S.ContainerScenarios>
                      <S.Scenario>
                        <S.Title>Lançamento</S.Title>
                        <S.Text>10%</S.Text>
                      </S.Scenario>
                      <S.Scenario>
                        <S.Title>Obras</S.Title>
                        <S.Text>40%</S.Text>
                      </S.Scenario>
                      <S.Scenario>
                        <S.Title>Pós Obras</S.Title>
                        <S.Text>50%</S.Text>
                      </S.Scenario>
                      <S.FooterScenario>
                        <S.Title>Total</S.Title>
                        <S.Text>100%</S.Text>
                      </S.FooterScenario>
                    </S.ContainerScenarios>
                  </Card>
                </S.ListScenarios>
              ) : (
                <S.Message width={'100%'} height={'auto'}>
                  <S.Title>
                    Ainda não há cenários de vendas criados. Por favor, crie um
                    novo cenário para que ele seja listado aqui.
                  </S.Title>
                  <Button size="200px">Novo Cenário</Button>
                </S.Message>
              )}
            </>
          )}
        </S.Content>
      </S.ScenariosContainer>

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
            <Button
              size="100px"
              onClick={() => navigate(`/edit?${convertToParams({ id, name })}`)}
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>

      <GenericModal
        maxWidth={'900px'}
        maxHeight={'350px'}
        open={newScenarios}
        setOpen={setNewScenarios}
      >
        <S.ContainerMessage>
          <S.Title>Novo Cenário </S.Title>
          <S.Text>
            Esse novo cenário poderá ser usado nos próximos cadastros
          </S.Text>
          <S.Form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 1 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Nome</S.Label>
                  <Input
                    required
                    id="username"
                    value={values.name}
                    onChange={handleChange}
                    aria-describedby="name"
                    placeholder="Digite seu nome"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Inicio</S.Label>
                  <Select
                    required
                    displayEmpty
                    name="startType"
                    onChange={handleChange}
                    value={values.startType}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={1}>Lançamento</MenuItem>
                    <MenuItem value={2}>Obra</MenuItem>
                    <MenuItem value={3}>Pós Obras</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={{ xs: 0, sm: 1 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={4}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Fase</S.Label>
                  <Select
                    required
                    displayEmpty
                    name="phase"
                    value={values.phase}
                    onChange={handleChange}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={1}>Lançamento</MenuItem>
                    <MenuItem value={2}>Obra</MenuItem>
                    <MenuItem value={3}>Pós Obras</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Inicio</S.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        views={['month', 'year']}
                        minDate={dayjs('2024-05-12')}
                        maxDate={dayjs('2024-08-12')}
                        onChange={(date) =>
                          setFieldValue('startDateSales', date || '')
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Velocidade de Vendas (%)</S.Label>

                  <Input
                    required
                    id="salesSpeed"
                    value={values.salesSpeed}
                    onChange={handleChange}
                    aria-describedby="salesSpeed"
                    placeholder="Digite aqui..."
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={{ xs: 0, sm: 1 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={12}>
                <S.ContainerButtons className="containerBtn">
                  <Button $isOutline size="140px">
                    Cancelar
                  </Button>
                  <Button size="140px" type="submit">
                    Adicionar
                  </Button>
                </S.ContainerButtons>
              </Grid>
            </Grid>
          </S.Form>
        </S.ContainerMessage>
      </GenericModal>

      <GenericModal
        open={openModal}
        maxWidth={'650px'}
        maxHeight={'300px'}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Icon src={icons.AlertTriangle} alt="Icon alert triangle" />
          <S.Title>{isDelete ? 'Deletar' : 'Cancelar'}</S.Title>

          <S.Text>
            {isDelete
              ? 'Você perderá essa informação. Esta ação não poderá ser desfeita'
              : 'Você perderá as alterações que ainda não foram salvas'}
          </S.Text>
          <S.ContainerButtons>
            <Button size="100px" onClick={() => setOpenModal(false)}>
              Não
            </Button>
            <Button
              size="100px"
              onClick={() =>
                isDelete
                  ? handleDelete()
                  : navigate(`/scenarios?${convertToParams({ id, name })}`)
              }
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </Layout>
  );
};
