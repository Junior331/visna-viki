/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton
} from '@mui/material';
import { Layout, Table } from '@/components/organism';
import {
  handleAdd,
  handleEdit,
  handleDelete,
  breadCrumbsItems,
  listDetailsBill
} from './utils';
import { emptyCosts } from '@/utils/emptys';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
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
import { rowData } from '@/components/modules/TableBody/@types';

export const DetailsBills = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [fields, setFields] = useState<rowData[]>([]);
  const { id, idProject, name, isEdit } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [expenseActive, setExpenseActive] = useState<expenseType>(
    emptyCosts.costs.shallowCost.land.expenses[0]
  );

  const formik = useFormik({
    initialValues: {
      rows: fields.map((row) => ({
        nome: row.nome,
        unidade: row.unidade,
        quantidade: row.quantidade,
        valor_total: row.valor_total,
        valor_unitário: row.valor_unitário
      }))
    },
    onSubmit: async (values) => {
      console.log('values ::', values);
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
      const newFields = Object.values(date)
        .filter((info): info is genericV2ObjType =>
          emptyInfo(info as string | number | genericObjType)
        )
        .map((cost) => cost.rows)
        .flat();
      console.log('newFields ::', newFields);
      setFields(newFields);
    }
  }, [date]);

  // Atualize valores do Formik quando fields mudar
  useEffect(() => {
    formik.setValues({
      rows: fields.map((row) => ({
        nome: row.nome,
        unidade: row.unidade,
        quantidade: row.quantidade,
        valor_total: row.valor_total,
        valor_unitário: row.valor_unitário
      }))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  // // Atualize fields quando date mudar
  // useEffect(() => {
  //   if (date) {
  //     Object.values(date)
  //       .filter((info): info is genericV2ObjType =>
  //         emptyInfo(info as string | number | genericObjType)
  //       )
  //       .forEach((cost) => {
  //         const list = cost.rows;
  //         console.log('list ::', list);
  //         setFields(list);
  //       });
  //   }
  // }, [date]);

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
                      // setFields(cost.rows);
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
                                <MenuItem onClick={() => handleAdd()}>
                                  Novo custo
                                  <ListItemIcon>
                                    <S.Icon
                                      src={icons.plus_circle}
                                      alt="Icon plus_circle"
                                    />
                                  </ListItemIcon>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => handleDelete()}>
                                  Deletar
                                  <ListItemIcon>
                                    <S.Icon
                                      src={icons.trash}
                                      alt="Icon trash"
                                    />
                                  </ListItemIcon>
                                </MenuItem>
                              </Menu>
                            </S.HeaderCard>
                            <S.ContainerExpenses>
                              <Table
                                formik={formik}
                                rows={cost.rows}
                                columns={mocks.columns}
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
                              <Button size="100px" type="submit">
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
    </Layout>
  );
};
