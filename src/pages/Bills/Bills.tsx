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
  listBills,
  handleView,
  handleEdit,
  handleDelete,
  breadCrumbsItems
} from './utils';
import { billType, subBillType } from './@types';
import { emptyBills } from '@/utils/types';
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
import * as S from './BillsStyled';
import { mocks } from '@/services/mocks';

export const Bills = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [billActive, setBillActive] = useState<subBillType>(
    emptyBills.bills[0]
  );
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<billType>(emptyBills);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    listBills({
      setDate,
      setLoading,
      setSnackbar
    });
  }, [setSnackbar]);

  return (
    <Layout>
      <S.BillsContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(name)} />
          <Button isOutline size="200px" onClick={() => setOpenModal(true)}>
            Cancelar
          </Button>
        </S.Header>
        <S.Content>
          {loading ? (
            <>
              {mocks.bills.bills.slice(0, 7).map(() => (
                <Card width={'100%'} height={'auto'} className="skeleton">
                  <S.HeaderCard>
                    <Skeleton height={20} width={'15%'} variant="rounded" />
                    <Skeleton height={20} width={'10px'} variant="rounded" />
                  </S.HeaderCard>

                  <S.ContainerExpenses>
                    <S.Expense>
                      <Skeleton height={20} width={'15%'} variant="rounded" />
                      <Skeleton height={20} width={'5%'} variant="rounded" />
                    </S.Expense>
                    <S.Expense>
                      <Skeleton height={20} width={'15%'} variant="rounded" />
                      <Skeleton height={20} width={'5%'} variant="rounded" />
                    </S.Expense>
                    <S.Expense>
                      <Skeleton height={20} width={'15%'} variant="rounded" />
                      <Skeleton height={20} width={'5%'} variant="rounded" />
                    </S.Expense>
                    <S.Expense>
                      <Skeleton height={20} width={'15%'} variant="rounded" />
                      <Skeleton height={20} width={'5%'} variant="rounded" />
                    </S.Expense>
                    <S.FooterExpense>
                      <Skeleton height={20} width={'15%'} variant="rounded" />
                      <Skeleton height={20} width={'5%'} variant="rounded" />
                    </S.FooterExpense>
                  </S.ContainerExpenses>
                </Card>
              ))}
            </>
          ) : (
            <>
              {date.bills.map((bill) => (
                <Card width={'100%'} height={'auto'} key={bill.id}>
                  <S.HeaderCard>
                    <S.Title>{bill.name}</S.Title>
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
                          setBillActive(bill);
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
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleEdit({
                            name,
                            navigate,
                            idProject: id,
                            id: billActive.id
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
                          handleView({ id: billActive.id, name, navigate })
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
                    {bill.expenses.map((expense) => (
                      <S.Expense>
                        <S.Title>{expense.name}</S.Title>
                        <S.Text>
                          R$ {formatCurrency(expense.value.toString())}
                        </S.Text>
                      </S.Expense>
                    ))}
                    <S.FooterExpense>
                      <S.Title>Total </S.Title>
                      <S.Text>
                        R$ {formatCurrency(bill.total.toString())}
                      </S.Text>
                    </S.FooterExpense>
                  </S.ContainerExpenses>
                </Card>
              ))}
              <Card width={'100%'} height={'auto'} className="footer">
                <S.FooterExpense>
                  <S.Title>Total </S.Title>
                  <S.Text>R$ {formatCurrency(date.total.toString())}</S.Text>
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
