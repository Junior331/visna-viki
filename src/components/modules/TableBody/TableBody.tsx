/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  TableRow,
  TableCell,
  FormControl,
  TableBody as MuiTableBody,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Props, rowData } from './@types';
import { Input } from '@/components/elements';
import { handleClickMenu, handleCloseMenu } from '@/utils/utils';
import { icons } from '@/assets/images/icons';
import { handleEdit } from './utils';
import * as S from './TableBodyStyled';

const TableBody = ({ align = 'left', rows, formik, isEdit }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [expenseActive, setExpenseActive] = useState<rowData>({});
  const [localValues, setLocalValues] = useState<{ [key: string]: any }>({});

  const { handleSubmit, setFieldValue, values } = formik;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    index: number
  ) => {
    const { value } = e.target;
    const fieldKey = `rows[${index}].${key}`;
    setLocalValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: value
    }));
    setFieldValue(fieldKey, value);
  };

  useEffect(() => {
    console.log('values ::', formik.values);
  }, [formik.values]);

  return (
    <MuiTableBody>
      {rows.map((row, index) => {
        return (
          <TableRow key={index}>
            {Object.keys(row).map((key) => {
              return (
                <>
                  <TableCell align={align} key={key}>
                    {isEdit ? (
                      <>
                        <S.Form onSubmit={handleSubmit}>
                          <FormControl sx={{ m: 1 }} variant="outlined">
                            <Input
                              required
                              id={`input-${index}-${key}`}
                              onChange={(e) => handleInputChange(e, key, index)}
                              value={
                                localValues[`rows[${index}].${key}`] ||
                                values.rows[index]?.[key] ||
                                ''
                              }
                              aria-describedby={`input-${index}-${key}`}
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
                                aria-controls={
                                  open ? 'account-menu' : undefined
                                }
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
                            </Menu>
                          </>
                        ) : (
                          <>{row[key]}</>
                        )}
                      </>
                    )}
                  </TableCell>
                </>
              );
            })}
          </TableRow>
        );
      })}
    </MuiTableBody>
  );
};

export { TableBody };
