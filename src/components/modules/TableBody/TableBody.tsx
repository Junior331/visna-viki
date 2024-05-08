import {
  TableRow,
  TableCell,
  FormControl,
  TableBody as MuiTableBody
} from '@mui/material';
import { useFormik } from 'formik';
import { Input } from '@/components/elements';
import { Props } from './@types';
import * as S from './TableBodyStyled';

const TableBody = ({ align = 'left', rows, isEdit }: Props) => {
  const fields = rows.map((row) => Object.keys(row).map((key) => row[key]));

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
                    <>{row[key]}</>
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
