/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  Skeleton
} from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { Layout, Table } from '@/components/organism';
import {
  handleEdit,
  breadCrumbsItems,
  listDetailsBill,
  initialValues,
  handleSumTotalValue,
  createNewCost
} from './utils';
import { emptyCosts } from '@/utils/emptys';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Card, GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import {
  convertToParams,
  formatCurrency,
  handleClickMenu,
  handleCloseMenu
} from '@/utils/utils';
import { useFormik } from 'formik';
import { mocks } from '@/services/mocks';
import { expenseType, genericObjType, genericV2ObjType } from '../Bills/@types';
import { emptyInfo } from '../Bills/utils';
import * as S from './DetailsBillsStyled';
import { payloadExpense } from '@/utils/types';

export const DetailsBills = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openModalNewExpense, setOpenModalNewExpense] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [isFormEdit, setIsFormEdit] = useState(false);

  const { id, idProject, name, isEdit } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [expenseActive, setExpenseActive] = useState<expenseType>(
    emptyCosts.costs.shallowCost.land.expenses[0]
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      formik.setValues(values);

      setIsFormEdit(false);
    }
  });

  const formikNewExpense = useFormik({
    initialValues: {
      expenseId: 0,
      typesCost: 0,
      quantity: '0',
      unitValue: '0',
      totalValue: 0,
      unitExpenseTypeId: 0
    },
    onSubmit: async (values) => {
      const payload: payloadExpense = {
        ...values,
        quantity: parseFloat(values.quantity),
        unitValue: parseFloat(values.unitValue),
        projectId: parseFloat(idProject)
      };

      const isAnyFieldEmpty = !values.expenseId || !values.typesCost;
      isAnyFieldEmpty
        ? setShowError(true)
        : createNewCost({ payload, setLoading, setSnackbar });

      setOpenModal(false);
      formikNewExpense.resetForm({});
    }
  });

  useEffect(() => {
    listDetailsBill({
      item: state.cost,
      id: parseFloat(id),
      setDate,
      setLoading,
      setSnackbar
    });
  }, [id, setSnackbar, state.cost]);

  return (
    <Layout>
      <S.DetailsBillsContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems(name, state.cost.name)}
          />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Cancelar
          </Button>
        </S.Header>
        <S.Content>
          {loading && (
            <>
              {Object.values(state.cost)
                .filter((info): info is genericObjType =>
                  emptyInfo(info as string | number | genericObjType)
                )
                .map((cost) => {
                  return (
                    <Card width={'100%'} height={'auto'} key={cost.id}>
                      <S.HeaderCard>
                        <Skeleton height={20} width={'15%'} variant="rounded" />
                        <Skeleton
                          height={20}
                          width={'10px'}
                          variant="rounded"
                        />
                      </S.HeaderCard>
                      <S.ContainerExpenses>
                        <S.Expense>
                          <Skeleton
                            height={300}
                            width={'100%'}
                            variant="rounded"
                          />
                        </S.Expense>
                        <S.FooterExpense>
                          <Skeleton
                            height={20}
                            width={'15%'}
                            variant="rounded"
                          />
                          <Skeleton
                            height={20}
                            width={'5%'}
                            variant="rounded"
                          />
                        </S.FooterExpense>
                      </S.ContainerExpenses>
                    </Card>
                  );
                })}
              <Card width={'100%'} height={'auto'} className="footer">
                <S.FooterExpense>
                  <Skeleton height={20} width={'15%'} variant="rounded" />
                  <Skeleton height={20} width={'5%'} variant="rounded" />
                </S.FooterExpense>
              </Card>
            </>
          )}
          {!loading && (
            <>
              {!date ? (
                <>
                  <Card width={'100%'} height={'200px'}>
                    <S.Message>Não há contas para edição.</S.Message>
                  </Card>
                </>
              ) : (
                <>
                  {Object.values(date) // cost: incorporationFeeType | shallowCostType
                    .filter((info): info is genericV2ObjType =>
                      emptyInfo(info as string | number | genericObjType)
                    )
                    .map((cost, key) => {
                      return (
                        <>
                          <Card width={'100%'} height={'auto'} key={key}>
                            <S.HeaderCard>
                              <S.Title>{cost.name}</S.Title>
                              {isEdit && (
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
                                    aria-controls={
                                      open ? 'account-menu' : undefined
                                    }
                                    onClick={(e) => {
                                      setExpenseActive(cost);
                                      handleClickMenu({
                                        event: e,
                                        setAnchorEl
                                      });
                                    }}
                                  >
                                    <S.Icon src={icons.menu} alt="Icon menu" />
                                  </IconButton>
                                </Box>
                              )}
                              <Menu
                                open={open}
                                id="account-menu"
                                anchorEl={anchorEl}
                                className="menuEdit detailsBillsMenu"
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
                                      transform:
                                        'translateY(-50%) rotate(45deg)',
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
                                  onClick={() => handleEdit({ setIsFormEdit })}
                                >
                                  Editar
                                  <ListItemIcon>
                                    <S.Icon src={icons.edit} alt="Icon edit" />
                                  </ListItemIcon>
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                  onClick={() => setOpenModalNewExpense(true)}
                                >
                                  Novo custo
                                  <ListItemIcon>
                                    <S.Icon
                                      src={icons.plus_circle}
                                      alt="Icon plus_circle"
                                    />
                                  </ListItemIcon>
                                </MenuItem>
                              </Menu>
                            </S.HeaderCard>
                            <S.ContainerExpenses>
                              <Table
                                cost={cost}
                                formik={formik}
                                rows={[]}
                                columns={mocks.columns}
                                expenseActive={expenseActive}
                                isEdit={
                                  isFormEdit && expenseActive.id === cost.id
                                }
                              />

                              <S.FooterExpense>
                                <S.Title>Total </S.Title>
                                <S.Text>
                                  R${' '}
                                  {formatCurrency(cost.totalValue.toString())}
                                </S.Text>
                              </S.FooterExpense>
                            </S.ContainerExpenses>
                          </Card>
                          {isFormEdit && expenseActive.id === cost.id && (
                            <S.ContainerButtons className="containerBtn">
                              <Button $isOutline size="80px">
                                Cancelar
                              </Button>
                              <Button
                                size="100px"
                                type="submit"
                                onClick={() => formik.handleSubmit()}
                              >
                                Salvar
                              </Button>
                            </S.ContainerButtons>
                          )}
                        </>
                      );
                    })}
                  <Card width={'100%'} height={'auto'} className="footer">
                    <S.FooterExpense>
                      <S.Title>Total </S.Title>
                      {/* <S.Text>R$ {formatCurrency(date.total)}</S.Text> */}
                    </S.FooterExpense>
                  </Card>
                </>
              )}
            </>
          )}
        </S.Content>
      </S.DetailsBillsContainer>

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
              onClick={() =>
                navigate(`/bills?${convertToParams({ id: idProject, name })}`)
              }
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>

      <GenericModal
        maxWidth={'900px'}
        maxHeight={'440px'}
        open={openModalNewExpense}
        setOpen={setOpenModalNewExpense}
      >
        <S.ContainerMessage>
          <S.Title>Novo custo</S.Title>
          <S.Text>Esse novo custo sera adicionado na sua listagem</S.Text>
          <S.Form onSubmit={formikNewExpense.handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                minWidth={300}
                minHeight={showError ? 117 : 76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de custos</S.Label>
                  <Select
                    displayEmpty
                    name="typesCost"
                    onBlur={formikNewExpense.handleBlur}
                    value={formikNewExpense.values.typesCost}
                    onChange={(e) => {
                      formikNewExpense.setFieldValue('expenseId', 0);
                      formikNewExpense.handleChange(e);
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
                  {showError && !formikNewExpense.values.typesCost && (
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
                md={6}
                minWidth={300}
                minHeight={showError ? 117 : 76}
              >
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de despesas</S.Label>
                  <Select
                    required
                    name="expenseId"
                    className="SelectComponent"
                    onBlur={formikNewExpense.handleBlur}
                    onChange={(e) => {
                      setShowError(false);
                      formikNewExpense.handleChange(e);
                    }}
                    value={formikNewExpense.values.expenseId}
                    disabled={!formikNewExpense.values.typesCost}
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    {formikNewExpense.values.typesCost === 1 ? (
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
                  {showError && !formikNewExpense.values.expenseId && (
                    <FormHelperText>
                      Tipos de despesas é obrigatório
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de unidades</S.Label>
                  <Select
                    displayEmpty
                    name="unitExpenseTypeId"
                    className="SelectComponent"
                    onChange={formikNewExpense.handleChange}
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={formikNewExpense.values.unitExpenseTypeId}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção</em>
                    </MenuItem>
                    <MenuItem value={1}>%</MenuItem>
                    <MenuItem value={2}>VB</MenuItem>
                    <MenuItem value={3}>mes</MenuItem>
                    <MenuItem value={4}>m²</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Quantidade</S.Label>
                  <Input
                    required
                    id="quantity"
                    aria-describedby="quantity"
                    placeholder="Digite a quantidade"
                    onBlur={(e) => {
                      formikNewExpense.setFieldValue(
                        'quantity',
                        e.target.value
                      );
                      handleSumTotalValue({
                        value2: e.target.value,
                        fieldName: 'totalValue',
                        value1: formikNewExpense.values.unitValue,
                        setFieldValue: formikNewExpense.setFieldValue
                      });
                    }}
                    onChange={formikNewExpense.handleChange}
                    value={formikNewExpense.values.quantity}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Valor unitario (R$)</S.Label>
                  <Input
                    required
                    id="unitValue"
                    aria-describedby="unitValue"
                    placeholder="0,00"
                    onBlur={(e) => {
                      formikNewExpense.setFieldValue(
                        'unitValue',
                        e.target.value
                      );
                      handleSumTotalValue({
                        value1: e.target.value,
                        fieldName: 'totalValue',
                        value2: formikNewExpense.values.quantity,
                        setFieldValue: formikNewExpense.setFieldValue
                      });
                    }}
                    onChange={formikNewExpense.handleChange}
                    value={formatCurrency(formikNewExpense.values.unitValue)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Valor total (R$)</S.Label>
                  <Input
                    disabled
                    id="totalValue"
                    placeholder="0,00"
                    aria-describedby="totalValue"
                    onChange={formikNewExpense.handleChange}
                    value={formatCurrency(
                      formikNewExpense.values.totalValue.toString()
                    )}
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
