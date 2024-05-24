import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton
} from '@mui/material';
import { Layout } from '@/components/organism';
import {
  listCosts,
  handleView,
  handleEdit,
  handleDelete,
  breadCrumbsItems,
  emptyInfo,
  calculateTotalValueCost
} from './utils';
import { emptyCosts } from '@/utils/emptys';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import {
  costsType,
  genericObjType,
  incorporationFeeType,
  shallowCostType
} from './@types';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Card, GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import {
  convertToParams,
  formatter,
  handleClickMenu,
  handleCloseMenu
} from '@/utils/utils';
import * as S from './BillsStyled';

export const Bills = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [costActive, setCostActive] = useState<
    shallowCostType | incorporationFeeType
  >(emptyCosts.costs.shallowCost);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<costsType>(emptyCosts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    listCosts({
      id: parseFloat(id),
      setDate,
      setLoading,
      setSnackbar
    });
  }, [id, setSnackbar]);
  useEffect(() => {
    const total = calculateTotalValueCost(date.costs);
    setTotal(total);
  }, [date]);

  return (
    <Layout>
      <S.BillsContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(id, name)} />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Cancelar
          </Button>
        </S.Header>
        <S.Content>
          {loading && (
            <>
              {Object.values(date.costs).map((cost) => {
                return (
                  <Card width={'100%'} height={'auto'} key={cost.id}>
                    <S.HeaderCard>
                      <Skeleton height={20} width={'15%'} variant="rounded" />
                      <Skeleton height={20} width={'10px'} variant="rounded" />
                    </S.HeaderCard>
                    <S.ContainerExpenses>
                      {Object.values(cost)
                        .filter((info): info is genericObjType =>
                          emptyInfo(info)
                        )
                        .map(() => {
                          return (
                            <S.Expense>
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
                            </S.Expense>
                          );
                        })}
                      <S.FooterExpense>
                        <Skeleton height={20} width={'15%'} variant="rounded" />
                        <Skeleton height={20} width={'5%'} variant="rounded" />
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
              {Object.values(date.costs).map((cost, key) => {
                return (
                  <Card width={'100%'} height={'auto'} key={key}>
                    <S.HeaderCard>
                      <S.Title>{cost.name}</S.Title>
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
                          aria-controls={open ? 'account-menu' : undefined}
                          onClick={(e) => {
                            setCostActive(cost);
                            handleClickMenu({ event: e, setAnchorEl });
                          }}
                        >
                          <S.Icon src={icons.menu} alt="Icon menu" />
                        </IconButton>
                      </Box>

                      <Menu
                        open={open}
                        id="account-menu"
                        anchorEl={anchorEl}
                        className="menuEdit billsMenu"
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
                              transform: 'translateY(-50%) rotate(45deg)',
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
                          onClick={() => {
                            handleEdit({
                              name,
                              navigate,
                              idProject: id,
                              cost: costActive,
                              id: costActive.id
                            });
                          }}
                        >
                          Editar
                          <ListItemIcon>
                            <S.Icon src={icons.edit} alt="Icon edit" />
                          </ListItemIcon>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={() =>
                            handleView({
                              name,
                              navigate,
                              idProject: id,
                              cost: costActive,
                              id: costActive.id
                            })
                          }
                        >
                          Ver detalhes
                          <ListItemIcon>
                            <S.Icon src={icons.eye} alt="Icon eye" />
                          </ListItemIcon>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleDelete()}>
                          Deletar
                          <ListItemIcon>
                            <S.Icon src={icons.trash} alt="Icon trash" />
                          </ListItemIcon>
                        </MenuItem>
                      </Menu>
                    </S.HeaderCard>
                    <S.ContainerExpenses>
                      {Object.values(cost)
                        .filter((info): info is genericObjType =>
                          emptyInfo(info)
                        )
                        .map((info) => {
                          return (
                            <S.Expense key={info.id}>
                              <S.Title>{info.name}</S.Title>
                              <S.Text>
                                {formatter.format(info.totalValue)}
                              </S.Text>
                            </S.Expense>
                          );
                        })}
                      <S.FooterExpense>
                        <S.Title>Total</S.Title>
                        <S.Text>{formatter.format(cost.totalValue)}</S.Text>
                      </S.FooterExpense>
                    </S.ContainerExpenses>
                  </Card>
                );
              })}
              <Card width={'100%'} height={'auto'} className="footer">
                <S.FooterExpense>
                  <S.Title>Total </S.Title>
                  <S.Text>{formatter.format(total)}</S.Text>
                </S.FooterExpense>
              </Card>
            </>
          )}
        </S.Content>
      </S.BillsContainer>

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
    </Layout>
  );
};
