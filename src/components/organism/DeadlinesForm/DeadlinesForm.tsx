import { useFormik } from 'formik';
import { FormControl, Grid, InputAdornment } from '@mui/material';
import { Props } from './@types';
import { Button, Input } from '@/components/elements';
import deadlinesFormSchema from './DeadlinesFormSchema';
import * as S from './DeadlinesFormStyled';
import { useEffect } from 'react';
import { MaskType } from '@/utils/types';
import { typeMask } from '@/utils/utils';

const DeadlinesForm = ({ date, setDate, handleStep }: Props) => {
  const formik = useFormik({
    initialValues: {
      startDate: '',
      totalDeadlineInMonth: '',
      approvalDeadlineInMonth: '',
      constructionDeadlineInMonth: ''
    },
    onSubmit: async (values) => {
      setDate({
        ...date,
        deadline: {
          ...values
        }
      });
      handleStep(4);
    },
    validationSchema: deadlinesFormSchema
  });
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    setFieldValue,
    handleChange
  } = formik;

  useEffect(() => {
    if (date.deadline.startDate) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lands: any = date.deadline;
      Object.keys(lands).forEach((key: string) => {
        setFieldValue(key, lands[key]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setFieldValue]);

  return (
    <S.DeadlinesFormContainer>
      <S.Form onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
            <Grid item xs={12} sm={12} md={3} minWidth={250}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Data de início</S.Label>
                <Input
                  required
                  id="startDate"
                  onBlur={handleBlur}
                  value={typeMask(MaskType.DATE, values.startDate)}
                  onChange={handleChange}
                  aria-describedby="startDate"
                  placeholder="Digite a Data"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.startDate && errors.startDate}
                  error={touched.startDate && Boolean(errors.startDate)}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">(m²)</InputAdornment>
                  //   )
                  // }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} minWidth={250}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Aprovação do projeto </S.Label>
                <Input
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="approvalDeadlineInMonth"
                  placeholder="Digite os meses"
                  value={values.approvalDeadlineInMonth}
                  aria-describedby="approvalDeadlineInMonth"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    touched.approvalDeadlineInMonth &&
                    errors.approvalDeadlineInMonth
                  }
                  error={
                    touched.approvalDeadlineInMonth &&
                    Boolean(errors.approvalDeadlineInMonth)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">mes</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} minWidth={250}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Execução da obra </S.Label>
                <Input
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Digite os meses"
                  id="constructionDeadlineInMonth"
                  value={values.constructionDeadlineInMonth}
                  aria-describedby="constructionDeadlineInMonth"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    touched.constructionDeadlineInMonth &&
                    errors.constructionDeadlineInMonth
                  }
                  error={
                    touched.constructionDeadlineInMonth &&
                    Boolean(errors.constructionDeadlineInMonth)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">mes</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} minWidth={250}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Prazo total</S.Label>
                <Input
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="totalDeadlineInMonth"
                  placeholder="Digite os meses"
                  value={values.totalDeadlineInMonth}
                  aria-describedby="totalDeadlineInMonth"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    touched.totalDeadlineInMonth && errors.totalDeadlineInMonth
                  }
                  error={
                    touched.totalDeadlineInMonth &&
                    Boolean(errors.totalDeadlineInMonth)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">mes</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
          </S.ContainerInputs>
        </Grid>
        <S.ContainerButtons>
          <Button isOutline size="80px" onClick={() => handleStep(2)}>
            Voltar
          </Button>
          <Button size="100px" type="submit">
            Proximo
          </Button>
        </S.ContainerButtons>
      </S.Form>
    </S.DeadlinesFormContainer>
  );
};

export { DeadlinesForm };
