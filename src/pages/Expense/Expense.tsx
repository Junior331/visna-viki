import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Layout } from '@/components/organism';
import { breadCrumbsItems, listCosts } from './utils';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import { costType } from '../ListBills/@types';
import * as S from './ExpenseStyled';

export const Expense = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { name } = Object.fromEntries([...searchParams]);
  const [typesCostOptions, setTypesCostOptions] = useState<costType[]>([]);
  const [typesExpenseOptions, setTypesExpenseOptions] = useState<costType[]>(
    []
  );

  const formik = useFormik({
    initialValues: {
      name: state.expense.name,
      typesCost: state.expense.typesCost,
      typesExpense: state.expense.typesExpense
    },
    onSubmit: async (values) => {
      console.log('values ::', values);
    }
  });

  const { values, handleSubmit, handleChange, setFieldValue } = formik;

  useEffect(() => {
    listCosts({
      setLoading,
      setSnackbar,
      setTypesCostOptions,
      setTypesExpenseOptions
    });
  }, [setSnackbar]);

  useEffect(() => {
    Object.keys(state.expense).forEach((key: string) => {
      setFieldValue(key, state.expense[key]);
    });
  }, [setFieldValue, state.expense]);

  return (
    <Layout>
      <S.ExpenseContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(name)} />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Cancelar
          </Button>
        </S.Header>
        <S.Content>
          {!loading && (
            <S.Form onSubmit={handleSubmit}>
              <S.ContainerInputs container spacing={{ xs: 0, sm: 0.2 }}>
                <Grid item xs={12} sm={12} md={3.95} minWidth={200}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Tipos de custos</S.Label>
                    <Select
                      displayEmpty
                      name="typesCost"
                      onChange={handleChange}
                      value={values.typesCost}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={''} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      {typesCostOptions.map((option) => (
                        <MenuItem value={option.name}>{option.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.95} minWidth={200}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Tipos de despesas</S.Label>
                    <Select
                      displayEmpty
                      name="typesExpense"
                      onChange={handleChange}
                      value={values.typesExpense}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={''} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      {typesExpenseOptions.map((option) => (
                        <MenuItem value={option.name}>{option.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.95} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Nome da despesa</S.Label>
                    <Input
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      aria-describedby="name"
                      placeholder="Digite o nome"
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
                  onClick={() => {
                    setOpenModal(true);
                  }}
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
          )}
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
          <S.Title>Cancelar</S.Title>
          <S.Text>Você perderá as alterações que ainda não foram salvas</S.Text>
          <S.ContainerButtons>
            <Button size="100px" onClick={() => setOpenModal(false)}>
              Não
            </Button>
            <Button size="100px" onClick={() => navigate(`/listbills`)}>
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </Layout>
  );
};
