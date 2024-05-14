import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { Props } from './@types';
import { FormControl, Grid } from '@mui/material';
import { MaskType } from '@/utils/types';
import { typeMask } from '@/utils/utils';
import { Button, Input } from '@/components/elements';
import deadlinesFormSchema from './DeadlinesFormSchema';
import { StepsIsDoneContext } from '@/contexts/StepIsDone';
import * as S from './DeadlinesFormStyled';

const DeadlinesForm = ({ date, setDate, handleStep }: Props) => {
  const { stepsIsDone, setStepsIsDone } = useContext(StepsIsDoneContext);

  const formik = useFormik({
    initialValues: date.deadline,
    onSubmit: async (values) => {
      setDate({
        ...date,
        deadline: {
          ...values
        }
      });
      setStepsIsDone([...stepsIsDone, '3']);

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
            <Grid item xs={12} sm={12} md={2.5} minWidth={250} minHeight={117}>
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
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2.5} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Aprovação do projeto (mes)</S.Label>
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
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2.5} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Execução da obra (mes)</S.Label>
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
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2.5} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Prazo total (mes)</S.Label>
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
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Prazo de lançamento (mes)</S.Label>
                <Input
                  required
                  id="endDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endDate}
                  aria-describedby="endDate"
                  placeholder="Digite os meses"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.endDate && errors.endDate}
                  error={touched.endDate && Boolean(errors.endDate)}
                />
              </FormControl>
            </Grid>
          </S.ContainerInputs>
        </Grid>
        <S.ContainerButtons>
          <Button $isOutline size="80px" onClick={() => handleStep(2)}>
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
