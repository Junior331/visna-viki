import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Backdrop, CircularProgress, FormControl, Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mocks } from '@/services/mocks';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import {
  convertDateToISO,
  convertToParams,
  formatCurrency,
  parseFormattedNumber,
  typeMask
} from '@/utils/utils';
import { SnackbarContext } from '@/contexts/Snackbar';
import {
  breadCrumbsItems,
  handleCreateAporte,
  handleSumValues,
  listAportes
} from './utils';
import { GenericModal, Pagination } from '@/components/modules';
import { HeaderBreadcrumbs, Layout, Table } from '@/components/organism';
import * as S from './AportesStyled';
import { aportesProps } from './@types';
import { MaskType } from '@/utils/types';

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
  const [openModalNewAporte, setOpenModalNewAporte] = useState(false);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {}
  });
  const formikNewAporte = useFormik({
    initialValues: {
      date: '',
      phaseOne: '',
      phaseTwo: '',
      observation: '',
      totalContributions: ''
    },
    onSubmit: async (values) => {
      const payload: aportesProps = {
        investment: 0,
        projectId: parseFloat(id),
        observation: values.observation,
        date: convertDateToISO(values.date || ''),
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
        formikNewAporte.resetForm({});

        listAportes({
          page,
          setList,
          perPage,
          setLoading,
          setSnackbar,
          setPageTotal,
          id: parseFloat(id)
        });
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
                formik={formik}
                columns={mocks.columnsAportes}
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
                  <Input
                    required
                    id="date"
                    aria-describedby="date"
                    placeholder="Digite a Data"
                    onBlur={formikNewAporte.handleBlur}
                    onChange={formikNewAporte.handleChange}
                    value={typeMask(MaskType.DATE, formikNewAporte.values.date)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
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
