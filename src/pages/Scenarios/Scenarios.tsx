/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Grid,
  Menu,
  Select,
  Divider,
  Skeleton,
  MenuItem,
  IconButton,
  FormControl,
  ListItemIcon
} from '@mui/material';
import {
  convertToParams,
  handleClickMenu,
  handleCloseMenu,
  removePropertyFromArray
} from '@/utils/utils';
import {
  payloadPhasesProps,
  phasesProps,
  scenariosProps,
  stepsProps
} from './@types';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Card, GenericModal } from '@/components/modules';
import {
  handleView,
  handleStartChange,
  handleSalesPercentesChange,
  handleDateChange
} from './utils';
import { Layout } from '@/components/organism';
import { emptyPhases, emptySummaryScenarios } from '@/utils/emptys';
import {
  deleteScenario,
  getListAllSteps,
  getListScenarios,
  postScenarios
} from './services';
import { payloadScenarios } from '@/utils/types';
import 'dayjs/locale/pt-br';
import * as S from './ScenariosStyled';

export const Scenarios = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [newScenarios, setNewScenarios] = useState(false);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [listPhases, setListPhases] = useState<phasesProps[]>(emptyPhases);
  const [listScenarios, setListScenarios] = useState<scenariosProps[]>([]);
  const [scenariosActive, setscenariosActive] = useState<scenariosProps>(
    emptySummaryScenarios
  );
  const [listAllSteps, setListAllSteps] = useState<stepsProps[][]>([]);
  const open = Boolean(anchorEl);
  const totalSalesPercentes = listPhases.reduce(
    (acc, phase) => acc + (phase.value || 0),
    0
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      start: 0,
      phases: listPhases
    },
    onSubmit: async (values) => {
      const updatedPhases = removePropertyFromArray(
        listPhases,
        'name'
      ) as payloadPhasesProps[];
      const payload: payloadScenarios = {
        name: values.name,
        phases: updatedPhases,
        projectId: parseFloat(id),
        projectStepId: updatedPhases[0].id
      };
      postScenarios({
        payload,
        setLoading,
        setSnackbar,
        setNewScenarios,
        setListAllSteps,
        setListScenarios,
        id: parseFloat(id)
      });
    }
  });
  const { values, handleSubmit, resetForm, handleChange } = formik;

  useEffect(() => {
    if (!openModal) {
      getListScenarios({
        setLoading,
        setSnackbar,
        setListScenarios,
        id: parseFloat(id)
      });
      getListAllSteps({
        setLoading,
        setSnackbar,
        setListAllSteps,
        id: parseFloat(id)
      });
    }
  }, [id, openModal, setSnackbar]);
  useEffect(() => {
    if (listPhases.length === 1) {
      listPhases[0].value = 100;
    }
  }, [listPhases]);

  return (
    <Layout>
      <S.ScenariosContainer>
        <S.Header>
          <Button size="200px" onClick={() => setNewScenarios(true)}>
            Novo Cenário
          </Button>
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
                  {listScenarios.map((scenario, index) => {
                    let total = 0;
                    scenario.phases.forEach((phase) => {
                      total += parseFloat(phase.value);
                    });
                    return (
                      <Card
                        key={index}
                        width={'100%'}
                        height={'auto'}
                        className="bgWhite"
                      >
                        <S.HeaderCard>
                          <S.Title>{scenario.hub}</S.Title>
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
                                setscenariosActive(scenario);
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
                            <MenuItem
                              onClick={() => {
                                handleView({
                                  name,
                                  navigate,
                                  idProject: id,
                                  id: scenariosActive?.project_scenarios_hub_id
                                });
                              }}
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
                          {scenario.phases.map((phase) => {
                            return (
                              <S.Scenario key={phase.id}>
                                <S.Title>{phase.step_name}</S.Title>
                                <S.Text>{phase.value}%</S.Text>
                              </S.Scenario>
                            );
                          })}
                          <S.FooterScenario>
                            <S.Title>Total</S.Title>
                            <S.Text>{total}%</S.Text>
                          </S.FooterScenario>
                        </S.ContainerScenarios>
                      </Card>
                    );
                  })}
                </S.ListScenarios>
              ) : (
                <S.Message width={'100%'} height={'auto'}>
                  <S.Title>
                    Ainda não há cenários de vendas criados. Por favor, crie um
                    novo cenário para que ele seja listado aqui.
                  </S.Title>
                  <Button size="200px" onClick={() => setNewScenarios(true)}>
                    Novo Cenário
                  </Button>
                </S.Message>
              )}
            </>
          )}
        </S.Content>
      </S.ScenariosContainer>

      <GenericModal
        open={openModal}
        maxWidth={'650px'}
        maxHeight={'300px'}
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
        maxHeight={'500px'}
        open={newScenarios}
        setOpen={setNewScenarios}
      >
        <S.ContainerMessage>
          <S.Title>Novo Cenário </S.Title>
          <S.Text margin="0 0 20px">
            Esse novo cenário poderá ser usado nos próximos cadastros
          </S.Text>
          <S.Form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 1 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Nome</S.Label>
                  <Input
                    required
                    id="name"
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
                    name="start"
                    value={values.start}
                    onChange={(e) => {
                      handleChange(e);
                      handleStartChange({
                        event: e,
                        listPhases,
                        setListPhases
                      });
                    }}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={49}>Lançamento</MenuItem>
                    <MenuItem value={50}>Obra</MenuItem>
                    <MenuItem value={51}>Pós Obras</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {listPhases.map((phase, index) => {
                return (
                  <>
                    <Grid item xs={12} sm={12} md={4}>
                      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <S.Label>Fase</S.Label>
                        <Input
                          required
                          disabled
                          id="phase"
                          aria-describedby="type"
                          value={listPhases[index].name}
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <S.Label>Data de inicio das vendas </S.Label>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="PT-BR"
                        >
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker
                              className={
                                totalSalesPercentes >= 100 && phase.value === 0
                                  ? 'Mui-disabled'
                                  : ''
                              }
                              disabled={
                                totalSalesPercentes >= 100 && phase.value === 0
                              }
                              views={['month', 'year']}
                              minDate={dayjs(
                                listAllSteps.length
                                  ? listAllSteps[index][0].date
                                  : ''
                              )}
                              maxDate={dayjs(
                                listAllSteps.length
                                  ? listAllSteps[index][
                                      listAllSteps[index].length - 1
                                    ].date
                                  : ''
                              )}
                              onChange={(date) => {
                                handleDateChange({
                                  date,
                                  index,
                                  listPhases,
                                  listAllSteps,
                                  setListPhases,
                                  start: values.start
                                });
                              }}
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
                          id="value"
                          name="value"
                          value={phase.value}
                          disabled={
                            totalSalesPercentes >= 100 && phase.value === 0
                          }
                          onChange={(e) => {
                            let value = parseFloat(e.target.value);
                            if (isNaN(value) || value < 0) value = 0;
                            if (value > 100) value = 100;
                            handleSalesPercentesChange({
                              value,
                              index,
                              listPhases,
                              setListPhases
                            });
                          }}
                          aria-describedby="value"
                          placeholder="Digite aqui..."
                          inputProps={{
                            style: { fontSize: '1.4rem' }
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </>
                );
              })}
            </Grid>

            <Grid container spacing={{ xs: 0, sm: 1 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={12}>
                <S.ContainerButtons className="containerBtn">
                  <Button
                    $isOutline
                    size="140px"
                    onClick={() => {
                      resetForm({});
                      setNewScenarios(false);
                      setListPhases(emptyPhases);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="140px"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
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
              onClick={() => {
                isDelete
                  ? deleteScenario({
                      id: scenariosActive.project_scenarios_hub_id,
                      setLoading,
                      setSnackbar,
                      setIsDelete,
                      setOpenModal
                    })
                  : navigate(`/edit?${convertToParams({ id, name })}`);
              }}
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </Layout>
  );
};
