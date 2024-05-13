import { useState } from 'react';
import {
  TableRow,
  TableCell,
  FormControl,
  TableBody as MuiTableBody,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Props, rowData } from './@types';
import { Input } from '@/components/elements';
import { handleClickMenu, handleCloseMenu } from '@/utils/utils';
import { icons } from '@/assets/images/icons';
import { handleDelete, handleEdit } from './utils';
import * as S from './TableBodyStyled';

const TableBody = ({ align = 'left', rows, isEdit }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fields = rows.map((row) => Object.keys(row).map((key) => row[key]));
  const open = Boolean(anchorEl);
  const [expenseActive, setExpenseActive] = useState<rowData>({});

  const formik = useFormik({
    initialValues: fields,
    onSubmit: async (values) => {
      console.log('values ::', values);
    }
  });
  const { handleSubmit, handleChange } = formik;

  return (
    <MuiTableBody>
      {rows.map((row, index) => {
        return (
          <TableRow key={index}>
            {Object.keys(row).map((key) => (
              <>
                <TableCell align={align} key={key}>
                  {isEdit ? (
                    <>
                      <S.Form onSubmit={handleSubmit}>
                        <FormControl sx={{ m: 1 }} variant="outlined">
                          <Input
                            required
                            id="startDate"
                            // value={values}
                            onChange={handleChange}
                            aria-describedby="startDate"
                            placeholder={row[key].toString()}
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                          />
                        </FormControl>
                      </S.Form>
                    </>
                  ) : (
                    <>
                      {row[key] === 'menu' ? (
                        <>
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
                                setExpenseActive(row);
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
                            className="menuEdit detailsExpenseMenu"
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
                              onClick={() =>
                                handleEdit({ expenseActive, navigate })
                              }
                            >
                              Editar
                              <ListItemIcon>
                                <S.Icon src={icons.edit} alt="Icon edit" />
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
                        </>
                      ) : (
                        <>{row[key]}</>
                      )}
                    </>
                  )}
                </TableCell>
              </>
            ))}
          </TableRow>
        );
      })}
    </MuiTableBody>
  );
};

export { TableBody };
