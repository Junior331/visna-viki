/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  Skeleton
} from '@mui/material';
import { Layout, Table } from '@/components/organism';
import {
  handleEdit,
  breadCrumbsItems,
  listDetailsBill,
  initialValues
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
import * as S from './DetailsBillsStyled';
import { emptyInfo } from '../Bills/utils';
import { initialState } from './@types';
import { KeyboardArrowDownRounded } from '@mui/icons-material';

export const DetailsBills = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalNewExpense, setOpenModalNewExpense] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [fields, setFields] = useState({
    land: { id: 0, name: '', rows: [] },
    project: { id: 0, name: '', rows: [] },
    constructions: { id: 0, name: '', rows: [] },
    Licenses: { id: 0, name: '', rows: [] },
    AdministrativeCosts: { id: 0, name: '', rows: [] }
  });
  const { id, idProject, name, isEdit } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [expenseActive, setExpenseActive] = useState<expenseType>(
    emptyCosts.costs.shallowCost.land.expenses[0]
  );

  const initialState = window.sessionStorage.getItem('FORM_DETAILS_BILLS');
  const initialStateParse = JSON.parse(initialState as string);

  const formik = useFormik({
    initialValues: initialState
      ? (initialStateParse as initialState)
      : initialValues,
    onSubmit: async (values) => {
      formik.setValues(values);
      window.sessionStorage.setItem(
        'FORM_DETAILS_BILLS',
        JSON.stringify(values)
      );

      setIsFormEdit(false);
    }
  });

  const formikNewExpense = useFormik({
    initialValues: {
      typesCost: '',
      nameExpense: '',
      typesExpense: ''
    },
    onSubmit: async () => {
      // setOpenModal(false);
      // setSnackbar({
      //   isOpen: true,
      //   severity: 'success',
      //   vertical: 'top',
      //   horizontal: 'right',
      //   message: 'Despesa adicionada com sucesso'
      // });
      // formikNewExpense.resetForm({});
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

  useEffect(() => {
    if (date) {
      // Atualize cada seção individualmente
      const sections = [
        'land',
        'project',
        'constructions',
        'Licenses',
        'AdministrativeCosts'
      ];
      const newFields: any = {};

      sections.forEach((section) => {
        if (date[section]) {
          newFields[section] = {
            id: date[section].id,
            name: date[section].name,
            rows: date[section].rows.map(
              (row: {
                nome: any;
                unidade: any;
                quantidade: any;
                valor_total: any;
                valor_unitário: any;
              }) => ({
                nome: row.nome,
                unidade: row.unidade,
                quantidade: row.quantidade,
                valor_total: row.valor_total,
                valor_unitário: row.valor_unitário
              })
            )
          };
        }
      });

      setFields(newFields);
    }
  }, [date]);

  useEffect(() => {
    const newFormikValues: initialState = {
      land: {
        id: fields.land.id,
        name: fields.land.name,
        rows: fields.land ? fields.land.rows : []
      },
      project: {
        id: fields.project.id,
        name: fields.project.name,
        rows: fields.project ? fields.project.rows : []
      },
      constructions: {
        id: fields.constructions.id,
        name: fields.constructions.name,
        rows: fields.constructions ? fields.constructions.rows : []
      },
      Licenses: {
        id: fields.Licenses.id,
        name: fields.Licenses.name,
        rows: fields.Licenses ? fields.Licenses.rows : []
      },
      AdministrativeCosts: {
        id: fields.AdministrativeCosts.id,
        name: fields.AdministrativeCosts.name,
        rows: fields.AdministrativeCosts ? fields.AdministrativeCosts.rows : []
      }
    };

    formik.setValues(newFormikValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

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
                                {/* <Divider /> */}
                                {/* <MenuItem
                                  onClick={() => setOpenModalNewExpense(true)}
                                >
                                  Novo custo
                                  <ListItemIcon>
                                    <S.Icon
                                      src={icons.plus_circle}
                                      alt="Icon plus_circle"
                                    />
                                  </ListItemIcon>
                                </MenuItem> */}
                                {/* <Divider /> */}
                                {/* <MenuItem onClick={() => handleDelete()}>
                                  Deletar
                                  <ListItemIcon>
                                    <S.Icon
                                      src={icons.trash}
                                      alt="Icon trash"
                                    />
                                  </ListItemIcon>
                                </MenuItem> */}
                              </Menu>
                            </S.HeaderCard>
                            <S.ContainerExpenses>
                              <Table
                                cost={cost}
                                formik={formik}
                                rows={cost.rows}
                                columns={mocks.columns}
                                expenseActive={expenseActive}
                                isEdit={
                                  isFormEdit && expenseActive.id === cost.id
                                }
                              />

                              <S.FooterExpense>
                                <S.Title>Total </S.Title>
                                <S.Text>R$ {formatCurrency(cost.total)}</S.Text>
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
                      <S.Text>R$ {formatCurrency(date.total)}</S.Text>
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
        maxWidth={'750px'}
        maxHeight={'400px'}
        open={openModalNewExpense}
        setOpen={setOpenModalNewExpense}
      >
        <S.ContainerMessage>
          <S.Title>Nova despesa</S.Title>
          <S.Text>
            Esse novo custo sera adicionado em (Terreno / Ourtuga / Despesas de
            aquisiÃ§ao)
          </S.Text>
          <S.Form onSubmit={formikNewExpense.handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de unidades</S.Label>
                  <Select
                    displayEmpty
                    name="typesCost"
                    onChange={formikNewExpense.handleChange}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    value={formikNewExpense.values.typesCost}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={''} disabled>
                      <em>% </em>
                    </MenuItem>
                    <MenuItem value="1">Teste 1</MenuItem>
                    <MenuItem value="2">Teste 2</MenuItem>
                    <MenuItem value="3">Teste 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Quantidade</S.Label>
                  <Input
                    id="nameExpense"
                    placeholder="20%"
                    aria-describedby="nameExpense"
                    onChange={formikNewExpense.handleChange}
                    value={formikNewExpense.values.nameExpense}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Valor unitario</S.Label>
                  <Input
                    id="nameExpense"
                    placeholder="R$ 520,00"
                    aria-describedby="nameExpense"
                    onChange={formikNewExpense.handleChange}
                    value={formikNewExpense.values.nameExpense}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Valor total</S.Label>
                  <Input
                    id="nameExpense"
                    placeholder="Valor unitario + quantidade = R$ ????"
                    aria-describedby="nameExpense"
                    onChange={formikNewExpense.handleChange}
                    value={formikNewExpense.values.nameExpense}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={300} mt={2.3}>
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
