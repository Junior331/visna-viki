import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Backdrop, CircularProgress, FormControl, Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mocks } from '@/services/mocks';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import {
  formatCurrency,
  convertToParams,
  parseFormattedNumber,
  formatter
} from '@/utils/utils';
import { SnackbarContext } from '@/contexts/Snackbar';
import {
  breadCrumbsItems,
  handleCreateAporte,
  handleEditAporte,
  handleSumValues,
  listAportes
} from './utils';
import { accumulator, aportesProps } from './@types';
import { Card, GenericModal, Pagination } from '@/components/modules';
import { HeaderBreadcrumbs, Layout, Table } from '@/components/organism';
import * as S from './AportesStyled';
import { emptyAccumulator } from '@/utils/emptys';

export const Aportes = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(10);
  const [pageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [list, setList] = useState<aportesProps[]>([]);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [accumulator, setAccumulator] = useState<accumulator>(emptyAccumulator);
  const [openModalNewAporte, setOpenModalNewAporte] = useState(false);

  const formikNewAporte = useFormik({
    initialValues: {
      date: null,
      phaseOne: '',
      phaseTwo: '',
      observation: '',
      totalContributions: ''
    },
    onSubmit: async (values) => {
      const payload: aportesProps = {
        investment: 0,
        date: values.date || '',
        projectId: parseFloat(id),
        observation: values.observation,
        payment: parseFormattedNumber(values.phaseOne),
        expenses: parseFormattedNumber(values.phaseTwo),
        total: parseFormattedNumber(values.totalContributions)
      };
      try {
        handleCreateAporte({
          payload,
          setLoading,
          setSnackbar,
          setOpenModalNewAporte
        });
      } catch (error) {
        console.error('error ::', error);
      } finally {
        listAportes({
          page,
          setList,
          perPage,
          setLoading,
          setSnackbar,
          setPageTotal,
          setAccumulator,
          id: parseFloat(id)
        });
        formikNewAporte.resetForm({});
      }
    }
  });

  useEffect(() => {
    listAportes({
      page,
      setList,
      perPage,
      setLoading,
      setSnackbar,
      setPageTotal,
      setAccumulator,
      id: parseFloat(id)
    });
  }, [id, page, perPage, setSnackbar]);

  return (
    <Layout>
      <S.AportesContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems({
              id,
              name
            })}
          />
          <div>
            <Button $isOutline size="100px" onClick={() => setOpenModal(true)}>
              Voltar
            </Button>
            <Button size="200px" onClick={() => setOpenModalNewAporte(true)}>
              Novo Aporte
            </Button>
          </div>
        </S.Header>
        <S.Content>
          {loading ? (
            <Backdrop open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <>
              <Table
                rows={list}
                formik={formikNewAporte}
                className="BoxShadowAportesMenu"
                columns={mocks.columnsAportes}
                handleEdit={(item) => {
                  handleEditAporte({
                    id,
                    name,
                    navigate: item.navigate,
                    aporte: item.expenseActive
                  });
                }}
              />

              {pageTotal > 1 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  perPage={perPage}
                  pageTotal={pageTotal}
                  setPerPage={setPerPage}
                  setPageTotal={setPageTotal}
                />
              )}

              <Card width={'100%'} height={'auto'}>
                <S.HeaderCard>
                  <S.Title>Totalizadores</S.Title>
                </S.HeaderCard>
                <S.ContainerExpenses>
                  <S.Expense>
                    <S.Title>Fase 1</S.Title>
                    <S.Text>{formatter.format(accumulator.payment)}</S.Text>
                  </S.Expense>
                  <S.Expense>
                    <S.Title>Fase 2</S.Title>
                    <S.Text>{formatter.format(accumulator.expenses)}</S.Text>
                  </S.Expense>
                  <S.Expense>
                    <S.Title>Aporte fundo de reserva</S.Title>
                    <S.Text>{formatter.format(accumulator.investment)}</S.Text>
                  </S.Expense>
                  <S.Expense>
                    <S.Title>Total de aportes</S.Title>
                    <S.Text>{formatter.format(accumulator.total)}</S.Text>
                  </S.Expense>
                </S.ContainerExpenses>
              </Card>
            </>
          )}
        </S.Content>
      </S.AportesContainer>

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
        maxHeight={'540px'}
        open={openModalNewAporte}
        setOpen={setOpenModalNewAporte}
      >
        <S.ContainerMessage>
          <S.Title>Novo Aporte</S.Title>
          <S.Text>Esse novo aporte será adicionado na tabela</S.Text>
          <S.Form onSubmit={formikNewAporte.handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Data</S.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                      <DesktopDatePicker
                        value={formikNewAporte.values.date}
                        format={'DD/MM/YYYY'}
                        onChange={(date) =>
                          formikNewAporte.setFieldValue('date', date || '')
                        }
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Fase 1</S.Label>
                  <Input
                    required
                    id="phaseOne"
                    aria-describedby="phaseOne"
                    placeholder="Digite o valor"
                    onBlur={(e) => {
                      formikNewAporte.setFieldValue('phaseOne', e.target.value);
                      handleSumValues({
                        fieldName: 'totalContributions',
                        value1: e.target.value,
                        setFieldValue: formikNewAporte.setFieldValue,
                        value2: formikNewAporte.values.phaseTwo
                      });
                    }}
                    onChange={formikNewAporte.handleChange}
                    value={formatCurrency(formikNewAporte.values.phaseOne)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Fase 2</S.Label>
                  <Input
                    required
                    id="phaseTwo"
                    aria-describedby="phaseTwo"
                    placeholder="Digite o valor"
                    onBlur={(e) => {
                      formikNewAporte.setFieldValue('phaseTwo', e.target.value);
                      handleSumValues({
                        fieldName: 'totalContributions',
                        value2: e.target.value,
                        setFieldValue: formikNewAporte.setFieldValue,
                        value1: formikNewAporte.values.phaseOne
                      });
                    }}
                    onChange={formikNewAporte.handleChange}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatCurrency(formikNewAporte.values.phaseTwo)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Total de Aportes</S.Label>
                  <Input
                    required
                    disabled
                    id="totalContributions"
                    placeholder="Digite o valor"
                    onBlur={formikNewAporte.handleBlur}
                    aria-describedby="totalContributions"
                    onChange={formikNewAporte.handleChange}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatCurrency(
                      formikNewAporte.values.totalContributions
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Observação</S.Label>
                  <Input
                    required
                    id="observation"
                    aria-describedby="observation"
                    placeholder="Digite a Observação"
                    onBlur={formikNewAporte.handleBlur}
                    onChange={formikNewAporte.handleChange}
                    value={formikNewAporte.values.observation}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={300}>
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
    </Layout>
  );
};
('2024-06-14T03:00:00.000Z');
