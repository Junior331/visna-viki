import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  FormHelperText
} from '@mui/material';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Layout } from '@/components/organism';
import { breadCrumbsItems, deleteExpense, editExpense } from './utils';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import * as S from './ExpenseStyled';
import { typesExpenses, typesIdCosts } from '../ListBills/@types';
import expenseSchema from './ExpenseSchema';

export const Expense = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { name } = Object.fromEntries([...searchParams]);

  const formik = useFormik({
    initialValues: {
      name: state.expense.name,
      typesCost:
        typesIdCosts[state.expense.typesCost as keyof typeof typesIdCosts] || 0,
      typesExpense:
        typesExpenses[
          state.expense.typesExpense as keyof typeof typesExpenses
        ] || 0
    },
    onSubmit: async (values) => {
      const id = state.expense.expenseId;
      const expense = {
        expenseName: values.name,
        expenseTypeId: values.typesExpense
      };
      const isAnyFieldEmpty = Object.values(values).some((value) => !value);

      isAnyFieldEmpty
        ? setShowError(true)
        : editExpense({ id, expense, navigate, setLoading, setSnackbar });
    },
    validationSchema: expenseSchema
  });

  const { values, handleBlur, handleSubmit, handleChange, setFieldValue } =
    formik;

  const handleModalDelete = () => {
    setIsDelete(true);
    setOpenModal(true);
  };

  return (
    <Layout>
      <S.ExpenseContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(name)} />
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
                minHeight={showError ? 102 : 76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de custos</S.Label>
                  <Select
                    displayEmpty
                    name="typesCost"
                    onBlur={handleBlur}
                    value={values.typesCost}
                    onChange={(e) => {
                      setFieldValue('typesExpense', 0);
                      handleChange(e);
                    }}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={1}>Custo Raso</MenuItem>
                    <MenuItem value={2}>Taxa da Incorporação</MenuItem>
                  </Select>
                  {showError && !values.typesCost && (
                    <FormHelperText>
                      Tipos de custos é obrigatório
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3.95}
                minWidth={200}
                minHeight={showError ? 102 : 76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de despesas</S.Label>
                  <Select
                    required
                    name="typesExpense"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.typesExpense}
                    className="SelectComponent"
                    disabled={!values.typesCost}
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    {values.typesCost === 1 ? (
                      [
                        <MenuItem key={1} value={1}>
                          Terreno, Outorga e Despesas de Aquisição
                        </MenuItem>,
                        <MenuItem key={2} value={2}>
                          Projetos, Assessorias e Decoração
                        </MenuItem>,
                        <MenuItem key={3} value={3}>
                          Obra
                        </MenuItem>,
                        <MenuItem key={4} value={4}>
                          Licenças / Ambiental / Legalização
                        </MenuItem>,
                        <MenuItem key={5} value={5}>
                          Despesas Administrativas
                        </MenuItem>
                      ]
                    ) : (
                      <MenuItem key={6} value={6}>
                        Taxa Administrativa
                      </MenuItem>
                    )}
                  </Select>
                  {showError && !values.typesExpense && (
                    <FormHelperText>
                      Tipos de despesas é obrigatório
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3.95}
                minWidth={250}
                minHeight={showError ? 102 : 76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Nome da despesa</S.Label>
                  <Input
                    id="name"
                    required
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
                  ? deleteExpense({
                      navigate,
                      setLoading,
                      setSnackbar,
                      id: state.expense.expenseId
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
