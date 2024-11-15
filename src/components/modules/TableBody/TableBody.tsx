/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ListItemIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Props, rowData } from './@types';
import { Input } from '@/components/elements';
import { handleClickMenu, handleCloseMenu } from '@/utils/utils';
import { icons } from '@/assets/images/icons';
import * as S from './TableBodyStyled';

const TableBody = ({
  cost,
  rows,
  isEdit,
  formik,
  isDelete,
  className,
  itemActive,
  align = 'left',
  handleEdit = () => {}
}: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [expenseActive, setExpenseActive] = useState<rowData>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string,
    rowIndex: number,
    sectionName: string
  ) => {
    const { value } = e.target;

    const updatedRows = formik?.values[itemActive.type].rows.map(
      (row: any, index: number) => {
        if (index === rowIndex) {
          return {
            ...row,
            [fieldName]: value
          };
        }
        return row;
      }
    );

    const newValues = {
      ...formik?.values,
      [itemActive.type]: {
        ...formik?.values[itemActive.type],
        rows: updatedRows
      }
    };

    formik?.setValues(newValues);

    formik?.setFieldValue(`${sectionName}.rows`, updatedRows);
  };

  return (
    <MuiTableBody>
      {rows.map((row: any, index: number) => {
        return (
          <TableRow key={index}>
            {Object.keys(row)
              .filter((key) => !key.toLowerCase().includes('id'))
              .map((key) => {
                return (
                  <TableCell align={align} key={key}>
                    {isEdit ? (
                      <S.Form onSubmit={formik?.handleSubmit}>
                        <FormControl sx={{ m: 1 }} variant="outlined">
                          <Input
                            required
                            id={`input-${index}-${key}`}
                            onChange={(e) => {
                              const fieldName: string = key;
                              handleInputChange(
                                e,
                                fieldName,
                                index,
                                cost?.name as string
                              );
                            }}
                            value={
                              formik?.values[itemActive.type]?.rows?.[index]?.[
                                key
                              ] || ''
                            }
                            aria-describedby={`input-${index}-${key}`}
                            placeholder={row[key].toString()}
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                          />
                        </FormControl>
                      </S.Form>
                    ) : (
                      <>
                        {row[key] === 'menu' ? (
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
                            <Menu
                              open={open}
                              id="account-menu"
                              anchorEl={anchorEl}
                              className={`menuEdit ${className}`}
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
                                  handleEdit({ expenseActive, navigate });
                                }}
                              >
                                {isDelete ? 'Delete' : 'Editar'}
                                <ListItemIcon>
                                  <S.Icon src={icons.edit} alt="Icon edit" />
                                </ListItemIcon>
                              </MenuItem>
                            </Menu>
                          </Box>
                        ) : (
                          <>{row[key]}</>
                        )}
                      </>
                    )}
                  </TableCell>
                );
              })}
          </TableRow>
        );
      })}
    </MuiTableBody>
  );
};

export { TableBody };
