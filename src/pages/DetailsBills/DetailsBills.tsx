/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {
  Box,
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
  breadCrumbsItems,
  listDetailsBill,
  initialValues,
  listCosts,
  handleFilter,
  createNewCost,
  handleDeleteCost,
  handleSumTotalValue,
  handleSumValues
} from './utils';
import { emptyCosts, emptyProjectInfo } from '@/utils/emptys';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Card, GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import {
  convertDateToISO,
  convertToParams,
  formatCurrency,
  formatMMYYYYDate,
  formatDateInMonth,
  formatter,
  handleClickMenu,
  handleCloseMenu,
  parseFormattedNumber,
  formatterV2
} from '@/utils/utils';
import { useFormik } from 'formik';
import { mocks } from '@/services/mocks';
import {
  genericObjType,
  genericV2ObjType,
  incorporationFeeType,
  shallowCostType
} from '../Bills/@types';
import { emptyInfo } from '../Bills/utils';
import * as S from './DetailsBillsStyled';
import { payloadExpense, projectInfoType } from '@/utils/types';
import { rowsDataType, unitExpenseType } from './@types';
import { unitExpenseTypes } from '../ListBills/@types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { getListAllSteps } from './services';
import { stepsProps } from '../Scenarios/@types';
import { getInfoProject } from '../EditProject/services';

export const DetailsBills = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [list, setList] = useState<rowsDataType[]>([]);
  const [projectStepId, setProjectStepId] = useState(0);
  const [openModalNewExpense, setOpenModalNewExpense] = useState(false);
  const [optionsExpense, setOptionsExpense] = useState<rowsDataType[]>([]);
  const [listAllSteps, setListAllSteps] = useState<stepsProps[]>([]);

  const { id, idProject, name, isEdit } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<shallowCostType | incorporationFeeType>(
    emptyCosts.costs.shallowCost
  );
  const [projectInfo, setProjectInfo] =
    useState<projectInfoType>(emptyProjectInfo);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [expenseActive, setExpenseActive] = useState<any>(
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
      quantity: '0',
      unitValue: '0',
      totalValue: 0,
      unitExpenseTypeId: 0,
      periodicityPayment: -1,
      paymentStartDate: dayjs('')
    },
    onSubmit: async (values) => {
      const payload: payloadExpense = {
        projectStepId,
        expenseId: values.expenseId,
        totalValue: values.totalValue,
        quantity: parseFloat(values.quantity),
        unitValue: parseFormattedNumber(values.unitValue),
        paymentStartDate: values.paymentStartDate,
        unitExpenseTypeId: values.unitExpenseTypeId,
        periodicityPayment: values.periodicityPayment,
        projectId: parseFloat(idProject)
      };
      const isAnyFieldEmpty = !!values.expenseId;
      if (!isAnyFieldEmpty) {
        setShowError(true);
      } else {
        createNewCost({ payload, setLoading, setSnackbar });
        setIsUpdate(true);
        setOpenModalNewExpense(false);
        formikNewExpense.resetForm({});
      }
    }
  });

  const emptyMask = [3, 2, 0].includes(
    formikNewExpense.values.unitExpenseTypeId
  );

  const handleModalDelete = () => {
    setIsDelete(true);
    setOpenModal(true);
  };

  useEffect(() => {
    listDetailsBill({
      setDate,
      idProject,
      setLoading,
      setSnackbar,
      item: state.cost
    });
  }, [idProject, setSnackbar, state.cost, isUpdate]);

  useEffect(() => {
    listCosts({
      setList,
      setLoading,
      setSnackbar
    });
  }, [setSnackbar]);

  useEffect(() => {
    const filteredList = handleFilter({
      list,
      typesCost: parseFloat(id),
      typesExpense: expenseActive.id
    });

    setOptionsExpense(filteredList);
  }, [expenseActive.id, id, list]);

  useEffect(() => {
    getListAllSteps({
      setLoading,
      setSnackbar,
      setListAllSteps,
      id: parseFloat(idProject)
    });

    getInfoProject({
      id: parseFloat(idProject),
      setDate: setProjectInfo,
      setSnackbar
    });
  }, [idProject, setSnackbar]);

  useEffect(() => {
    handleSumValues({
      type: unitExpenseType[
        `type_${
          formikNewExpense.values.unitExpenseTypeId || 0
        }` as keyof typeof unitExpenseType
      ],
      value2: projectInfo.land,
      fieldName: 'totalValue',
      value1: formikNewExpense.values.unitValue,
      setFieldValue: formikNewExpense.setFieldValue
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formikNewExpense.values.unitExpenseTypeId,
    formikNewExpense.values.unitValue
  ]);

  return (
    <Layout>
      <S.DetailsBillsContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems({
              name,
              idProject,
              bill: state.cost.name
            })}
          />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
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
                  {Object.values(date)
                    .filter((info): info is genericV2ObjType =>
                      emptyInfo(info as string | number | genericObjType)
                    )
                    .map((cost, key) => {
                      const transformData = cost.expenses.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        unitType:
                          unitExpenseTypes[
                            `unitType${item.unitType}` as keyof typeof unitExpenseTypes
                          ],
                        quantity:
                          unitExpenseType[
                            `type_${item.unitTypeId}` as keyof typeof unitExpenseType
                          ] === '%'
                            ? `${item.unitValue}`
                            : item.quantity || '-',
                        date: formatMMYYYYDate(item.date),
                        unitValue: [3, 2, 0].includes(item.unitTypeId)
                          ? formatter.format(item.unitValue)
                          : formatter.format(
                              handleSumValues({
                                type: unitExpenseType[
                                  `type_${item.unitTypeId}` as keyof typeof unitExpenseType
                                ],
                                value1: item?.unitValue
                                  ? item.unitValue.toString()
                                  : '0',
                                fieldName: 'totalValue',
                                value2: projectInfo.land,
                                setFieldValue: () => {}
                              })
                            ),
                        unitTypeById: item.unitType,
                        totalValueNoId: formatter.format(item.totalValue),
                        unitValueByIdNumber: item.unitValue,
                        totalValueByIdNumber: item.totalValue,
                        expenseHubId: item.expenseHubId,
                        unitTypeId: item.unitTypeId,
                        projectId: item.projectId,
                        action: 'menu'
                      }));
                      console.log('cost ::', cost);

                      return (
                        <>
                          <Card
                            width={'100%'}
                            height={'auto'}
                            key={key}
                            className="bgWhite"
                          >
                            <S.HeaderCard>
                              <S.Title>{cost.name}</S.Title>
                              {Boolean(isEdit) && (
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
                                isDelete
                                cost={cost}
                                formik={formik}
                                className="menuEdit detailsExpensesMenu"
                                rows={transformData}
                                columns={mocks.columns}
                                expenseActive={expenseActive}
                                handleEdit={(item) => {
                                  setExpenseActive(item.expenseActive);
                                  handleModalDelete();
                                }}
                                isEdit={
                                  isFormEdit && expenseActive.id === cost.id
                                }
                              />

                              <S.FooterExpense>
                                <S.Title>Total </S.Title>
                                <S.Text>
                                  {formatter.format(cost.totalValue)}
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
                  ? handleDeleteCost({
                      navigate,
                      setLoading,
                      setSnackbar,
                      setIsDelete,
                      setOpenModal,
                      cost: state.cost,
                      costId: state.cost.id,
                      projectId: idProject,
                      projectName: name,
                      id: expenseActive?.expenseHubId
                    })
                  : navigate(
                      `/edit?${convertToParams({ id: idProject, name })}`
                    );
              }}
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>

      <GenericModal
        maxWidth={'900px'}
        maxHeight={'540px'}
        open={openModalNewExpense}
        setOpen={setOpenModalNewExpense}
      >
        <S.ContainerMessage>
          <S.Title>Novo custo</S.Title>
          <S.Text>
            Esse novo custo sera adicionado em ({expenseActive.name})
          </S.Text>
          <S.Form onSubmit={formikNewExpense.handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={12} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Despesa</S.Label>
                  <Select
                    displayEmpty
                    name="expenseId"
                    className="SelectComponent"
                    disabled={!id || !expenseActive.id}
                    onChange={formikNewExpense.handleChange}
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={formikNewExpense.values.expenseId}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção</em>
                    </MenuItem>

                    {optionsExpense.map((option) => (
                      <MenuItem value={option.expenseId}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {showError && (
                    <FormHelperText>Despesa é obrigatório</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Data de início de pagamento</S.Label>

                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="PT-BR"
                  >
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        views={['month', 'year']}
                        minDate={dayjs(
                          listAllSteps.length ? listAllSteps[0].date : ''
                        )}
                        maxDate={dayjs(
                          listAllSteps.length
                            ? listAllSteps[listAllSteps.length - 1].date
                            : ''
                        )}
                        onChange={(date) => {
                          const dateIso = convertDateToISO(
                            dayjs(date).format('DD/MM/YYYY')
                          );
                          const obj = listAllSteps.find(
                            (item) =>
                              formatDateInMonth(item.date) ===
                              formatDateInMonth(dateIso)
                          );
                          setProjectStepId(obj?.id || 0);
                          formikNewExpense.setFieldValue(
                            'paymentStartDate',
                            date || ''
                          );
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Periodicidade (de pagamentos)</S.Label>
                  <Select
                    displayEmpty
                    name="periodicityPayment"
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={formikNewExpense.values.periodicityPayment}
                    onChange={(e) => {
                      if (!e.target.value) {
                        formikNewExpense.setFieldValue('quantity', 1);
                      }
                      formikNewExpense.handleChange(e);
                    }}
                  >
                    <MenuItem value={-1} disabled>
                      <em>Selecione a opção</em>
                    </MenuItem>
                    <MenuItem value={1}>Mensal</MenuItem>
                    <MenuItem value={2}>Bimestral</MenuItem>
                    <MenuItem value={4}>Quadrimestral</MenuItem>
                    <MenuItem value={6}>Semestral</MenuItem>
                    <MenuItem value={12}>Anual</MenuItem>
                    <MenuItem value={0}>Isoladas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Uni. Pagamento</S.Label>
                  <Select
                    displayEmpty
                    name="unitExpenseTypeId"
                    className="SelectComponent"
                    onChange={(e) => {
                      formikNewExpense.handleChange(e);
                      formikNewExpense.setFieldValue('unitValue', '0');
                    }}
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
                    disabled={!formikNewExpense.values.periodicityPayment}
                    aria-describedby="quantity"
                    placeholder="Digite a quantidade"
                    onBlur={(e) => {
                      formikNewExpense.setFieldValue(
                        'quantity',
                        e.target.value
                      );
                      if (emptyMask) {
                        handleSumTotalValue({
                          value2: e.target.value,
                          fieldName: 'totalValue',
                          value1: formikNewExpense.values.unitValue,
                          setFieldValue: formikNewExpense.setFieldValue
                        });
                      }
                    }}
                    onChange={formikNewExpense.handleChange}
                    value={formikNewExpense.values.quantity}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>
                    Valor unitario (
                    {
                      unitExpenseType[
                        `type_${
                          formikNewExpense.values.unitExpenseTypeId || 0
                        }` as keyof typeof unitExpenseType
                      ]
                    }
                    )
                  </S.Label>
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

                      if (!formikNewExpense.values.periodicityPayment) {
                        handleSumValues({
                          type: unitExpenseType[
                            `type_${formikNewExpense.values.unitExpenseTypeId}` as keyof typeof unitExpenseType
                          ],
                          value1: e.target.value,
                          fieldName: 'totalValue',
                          value2: formikNewExpense.values.quantity,
                          setFieldValue: formikNewExpense.setFieldValue
                        });
                      }
                    }}
                    onChange={formikNewExpense.handleChange}
                    value={
                      !emptyMask
                        ? formikNewExpense.values.unitValue
                        : formatCurrency(formikNewExpense.values.unitValue)
                    }
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
                    name="totalValue"
                    placeholder="0,00"
                    aria-describedby="totalValue"
                    onChange={formikNewExpense.handleChange}
                    value={formatterV2.format(
                      formikNewExpense.values.totalValue
                    )}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={300}>
                <S.ContainerButtons className="containerBtn">
                  <Button
                    $isOutline
                    size="140px"
                    onClick={() => setOpenModalNewExpense(false)}
                  >
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
