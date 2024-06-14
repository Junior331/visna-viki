import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { FormControl, Grid } from '@mui/material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { icons } from '@/assets/images/icons';
import { Layout } from '@/components/organism';
import { GenericModal } from '@/components/modules';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { HeaderBreadcrumbs } from '@/components/organism';
import {
  breadCrumbsItems,
  handleEditAporte,
  handleDeleteAporte as deleteAporte
} from './utils';
import * as S from './AporteStyled';
import {
  convertDateToISO,
  formatCurrency,
  parseFormattedNumber
} from '@/utils/utils';
import { handleSumValues } from '../Aportes/utils';

export const Aporte = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { id, name } = Object.fromEntries([...searchParams]);

  const formik = useFormik({
    initialValues: {
      date: dayjs(convertDateToISO(state.aporte.date || '') || null),
      phaseOne: formatCurrency(state.aporte.phaseOne) || '',
      phaseTwo: formatCurrency(state.aporte.phaseTwo) || '',
      observation: state.aporte.observation || '',
      totalContributions: formatCurrency(state.aporte.TotalContributions) || ''
    },
    onSubmit: async (values) => {
      const payload = {
        investment: 0,
        id: state.aporte.id,
        observation: values.observation,
        projectId: parseFloat(id as string),
        date: dayjs(values.date || null) || '',
        payment: parseFormattedNumber(values.phaseOne),
        expenses: parseFormattedNumber(values.phaseTwo),
        total: parseFormattedNumber(values.totalContributions)
      };

      handleEditAporte({
        name,
        payload,
        navigate,
        setLoading,
        setSnackbar,
        projectId: id,
        id: state.aporte.id
      });
    }
  });

  const { values, handleSubmit, handleChange, setFieldValue } = formik;

  const handleModalDelete = () => {
    setIsDelete(true);
    setOpenModal(true);
  };

  return (
    <Layout>
      <S.ExpenseContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems(id, name, state.aporte.observation)}
          />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
          </Button>
        </S.Header>
        <S.Content>
          <S.Form onSubmit={handleSubmit}>
            <S.ContainerInputs container spacing={{ xs: 0, sm: 0.2 }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={3.95}
                minWidth={200}
                minHeight={76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Data</S.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                      <DesktopDatePicker
                        format={'DD/MM/YYYY'}
                        value={dayjs(values.date)}
                        onChange={(date) => setFieldValue('date', date || '')}
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3.95}
                minWidth={250}
                minHeight={76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Fase 1</S.Label>
                  <Input
                    required
                    id="phaseOne"
                    onBlur={(e) => {
                      setFieldValue('phaseOne', e.target.value);
                      handleSumValues({
                        value1: e.target.value,
                        value2: values.phaseTwo,
                        setFieldValue: setFieldValue,
                        fieldName: 'totalContributions'
                      });
                    }}
                    onChange={handleChange}
                    aria-describedby="phaseOne"
                    placeholder="Digite o valor"
                    value={formatCurrency(values.phaseOne)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3.95}
                minWidth={250}
                minHeight={76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Fase 2</S.Label>
                  <Input
                    required
                    id="phaseTwo"
                    onBlur={(e) => {
                      setFieldValue('phaseTwo', e.target.value);
                      handleSumValues({
                        value2: e.target.value,
                        value1: values.phaseOne,
                        setFieldValue: setFieldValue,
                        fieldName: 'totalContributions'
                      });
                    }}
                    onChange={handleChange}
                    aria-describedby="phaseTwo"
                    placeholder="Digite o valor"
                    value={formatCurrency(values.phaseTwo)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3.95}
                minWidth={250}
                minHeight={76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Total de aportes</S.Label>
                  <Input
                    required
                    disabled
                    id="totalContributions"
                    onChange={handleChange}
                    placeholder="Digite o valor"
                    aria-describedby="totalContributions"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatCurrency(values.totalContributions)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={8} minWidth={200} minHeight={76}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Observação</S.Label>
                  <Input
                    required
                    id="observation"
                    onChange={handleChange}
                    value={values.observation}
                    aria-describedby="observation"
                    placeholder="Digite a Observação"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
            </S.ContainerInputs>

            <S.ContainerButtons>
              <Button
                $isOutline
                size="80px"
                className="btnDelete"
                onClick={() => handleModalDelete()}
              >
                Deletar
              </Button>
              <div>
                <Button
                  $isOutline
                  size="80px"
                  onClick={() => setOpenModal(true)}
                >
                  Cancelar
                </Button>
                <Button size="100px" type="submit">
                  Salvar
                </Button>
              </div>
            </S.ContainerButtons>
          </S.Form>
        </S.Content>
      </S.ExpenseContainer>

      <GenericModal
        maxWidth={'650px'}
        maxHeight={'300px'}
        open={openModal}
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
              loading={loading}
              disabled={loading}
              onClick={() =>
                isDelete
                  ? deleteAporte({
                      name,
                      navigate,
                      setLoading,
                      setSnackbar,
                      projectId: id,
                      id: state.aporte.id
                    })
                  : navigate(`/listbills`)
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
