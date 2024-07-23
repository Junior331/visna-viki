import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Layout } from '@/components/organism';
import { breadCrumbsItems, deleteCost, editCost } from './utils';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import * as S from './CostDetailsStyled';
import { convertToParams } from '@/utils/utils';

export const CostDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { name, expenseId } = Object.fromEntries([...searchParams]);

  const formik = useFormik({
    initialValues: {
      name: name || '',
      unitType: state.expense.unitTypeById || 0,
      quantity: state.expense.quantity || '',
      unitValue: state.expense.unitValueByIdNumber || '',
      totalValue: state.expense.totalValueByIdNumber || ''
    },
    onSubmit: async (values) => {
      const expense = {
        expenseId: state.expense.id,
        quantity: parseFloat(values.quantity),
        unitValue: parseFloat(values.unitValue),
        totalValue: parseFloat(values.totalValue),
        projectId: state.expense.projectId,
        unitExpenseTypeId: values.unitType
      };
      editCost({
        state,
        expense,
        navigate,
        setLoading,
        setSnackbar,
        id: parseFloat(expenseId)
      });
    }
  });

  const { values, handleBlur, handleSubmit, handleChange } = formik;

  const handleModalDelete = () => {
    setIsDelete(true);
    setOpenModal(true);
  };

  return (
    <Layout>
      <S.CostDetailsContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems({
              name: state.projectName,
              costName: state.cost.name,
              idProject: state.expense.projectId,
              bill: state.bill.name,
              billId: state.bill.id
            })}
            stateParams={{ cost: state.bill }}
          />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
          </Button>
        </S.Header>
        <S.Content>
          <S.Form onSubmit={handleSubmit}>
            <S.ContainerInputs
              container
              className="bgWhite"
              spacing={{ xs: 0, sm: 0.2 }}
            >
              <Grid item xs={12} sm={12} md={3.95} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Nome</S.Label>
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
              <Grid item xs={12} sm={12} md={3.95} minWidth={200}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>UNIDADE</S.Label>
                  <Select
                    displayEmpty
                    name="unitType"
                    onBlur={handleBlur}
                    value={values.unitType}
                    onChange={handleChange}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={1}>%</MenuItem>
                    <MenuItem value={2}>VB</MenuItem>
                    <MenuItem value={3}>mes</MenuItem>
                    <MenuItem value={4}>m²</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={3.95} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Quantidade</S.Label>
                  <Input
                    id="quantity"
                    required
                    value={values.quantity}
                    onChange={handleChange}
                    aria-describedby="quantity"
                    placeholder="Digite a quantidade"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={3.95} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Valor unitário</S.Label>
                  <Input
                    required
                    id="unitValue"
                    value={values.unitValue}
                    onChange={handleChange}
                    aria-describedby="unitValue"
                    placeholder="Digite a quantidade"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={3.95} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Valor total</S.Label>
                  <Input
                    required
                    id="totalValue"
                    onChange={handleChange}
                    value={values.totalValue}
                    aria-describedby="totalValue"
                    placeholder="Digite a quantidade"
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
      </S.CostDetailsContainer>

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
                  ? deleteCost({
                      navigate,
                      setLoading,
                      setSnackbar,
                      cost: state.bill,
                      costId: state.bill.id,
                      setIsDelete: () => {},
                      setOpenModal: () => {},
                      projectId: state.expense.projectId,
                      projectName: state.projectName,
                      id: parseFloat(expenseId)
                    })
                  : navigate(
                      `/details?isEdit=true&${convertToParams({
                        idProject: state.expense.projectId,
                        name: state.projectName,
                        id: state.bill.id
                      })}`,
                      {
                        state: { cost: state.bill }
                      }
                    )
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
