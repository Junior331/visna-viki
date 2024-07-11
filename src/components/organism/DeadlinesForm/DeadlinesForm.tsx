import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { Props } from './@types';
import { FormControl, Grid } from '@mui/material';
import { handleKeyDown } from '@/utils/utils';
import { Button, Input } from '@/components/elements';
import deadlinesFormSchema from './DeadlinesFormSchema';
import { StepsIsDoneContext } from '@/contexts/StepIsDone';
import * as S from './DeadlinesFormStyled';
import { handleSumValues } from './utils';
import { Tooltip } from '@/components/elements/Tooltip';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';

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

  useEffect(() => {
    if (date.deadline.startDate) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lands: any = date.deadline;
      Object.keys(lands).forEach((key: string) => {
        console.log('key, lands[key] ::', key, lands[key]);
        formik.setFieldValue(key, lands[key]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDate({
      ...date,
      deadline: {
        ...formik.values
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  return (
    <S.DeadlinesFormContainer>
      <S.Form onSubmit={formik.handleSubmit}>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <S.ContainerInputs
            container
            className="bgWhite"
            spacing={{ xs: 0, sm: 2 }}
          >
            <Grid item xs={12} sm={12} md={1.9} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Tooltip title={'Data de início'}>
                  <S.Label>D. Início</S.Label>
                </Tooltip>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem>
                    <DesktopDatePicker
                      format={'DD/MM/YYYY'}
                      value={formik.values.startDate || null}
                      onChange={(date) =>
                        formik.setFieldValue('startDate', date || '')
                      }
                    />
                  </DemoItem>
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={2.5} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Tooltip title={'Aprovação do projeto (mes)'}>
                  <S.Label>A. Projeto (mes)</S.Label>
                </Tooltip>
                <Input
                  required
                  onBlur={(e) => {
                    formik.setFieldValue(
                      'approvalDeadlineInMonth',
                      parseFloat(e.target.value)
                    );
                    handleSumValues({
                      value1: parseFloat(e.target.value),
                      value2: formik.values.projectLaunchDeadlineInMonth,
                      value3: formik.values.constructionDeadlineInMonth,
                      fieldName: 'totalDeadlineInMonth',
                      setFieldValue: formik.setFieldValue
                    });
                  }}
                  onChange={formik.handleChange}
                  id="approvalDeadlineInMonth"
                  placeholder="Digite os meses"
                  value={formik.values.approvalDeadlineInMonth}
                  aria-describedby="approvalDeadlineInMonth"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    formik.touched.approvalDeadlineInMonth &&
                    formik.errors.approvalDeadlineInMonth
                  }
                  error={
                    formik.touched.approvalDeadlineInMonth &&
                    Boolean(formik.errors.approvalDeadlineInMonth)
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={2} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Tooltip title={'Prazo de lançamento (mes)'}>
                  <S.Label>P. Lançamento (mes)</S.Label>
                </Tooltip>
                <Input
                  required
                  id="projectLaunchDeadlineInMonth"
                  onBlur={(e) => {
                    formik.setFieldValue(
                      'projectLaunchDeadlineInMonth',
                      parseFloat(e.target.value)
                    );
                    handleSumValues({
                      value1: formik.values.approvalDeadlineInMonth,
                      value2: parseFloat(e.target.value),
                      value3: formik.values.constructionDeadlineInMonth,
                      fieldName: 'totalDeadlineInMonth',
                      setFieldValue: formik.setFieldValue
                    });
                  }}
                  value={formik.values.projectLaunchDeadlineInMonth}
                  onChange={formik.handleChange}
                  aria-describedby="projectLaunchDeadlineInMonth"
                  placeholder="Digite os meses"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    formik.touched.projectLaunchDeadlineInMonth &&
                    formik.errors.projectLaunchDeadlineInMonth
                  }
                  error={
                    formik.touched.projectLaunchDeadlineInMonth &&
                    Boolean(formik.errors.projectLaunchDeadlineInMonth)
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={1.9} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Tooltip title={'Execução da obra (mes)'}>
                  <S.Label>E. Obra (mes)</S.Label>
                </Tooltip>
                <Input
                  required
                  onBlur={(e) => {
                    formik.setFieldValue(
                      'constructionDeadlineInMonth',
                      parseFloat(e.target.value)
                    );
                    handleSumValues({
                      value1: formik.values.approvalDeadlineInMonth,
                      value2: formik.values.projectLaunchDeadlineInMonth,
                      value3: parseFloat(e.target.value),
                      fieldName: 'totalDeadlineInMonth',
                      setFieldValue: formik.setFieldValue
                    });
                  }}
                  onChange={formik.handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite os meses"
                  id="constructionDeadlineInMonth"
                  value={formik.values.constructionDeadlineInMonth}
                  aria-describedby="constructionDeadlineInMonth"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    formik.touched.constructionDeadlineInMonth &&
                    formik.errors.constructionDeadlineInMonth
                  }
                  error={
                    formik.touched.constructionDeadlineInMonth &&
                    Boolean(formik.errors.constructionDeadlineInMonth)
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={1.8} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Pós obra</S.Label>
                <Input
                  required
                  onBlur={formik.handleBlur}
                  id="afterConstruction"
                  onChange={formik.handleChange}
                  placeholder="Digite os meses"
                  value={formik.values.afterConstruction}
                  aria-describedby="afterConstruction"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={1.9} minWidth={250} minHeight={117}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Tooltip title={'Prazo total (mes)'}>
                  <S.Label>P. Total (mes)</S.Label>
                </Tooltip>
                <Input
                  required
                  disabled
                  id="totalDeadlineInMonth"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Digite os meses"
                  value={formik.values.totalDeadlineInMonth || 0}
                  aria-describedby="totalDeadlineInMonth"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    formik.touched.totalDeadlineInMonth &&
                    formik.errors.totalDeadlineInMonth
                  }
                  error={
                    formik.touched.totalDeadlineInMonth &&
                    Boolean(formik.errors.totalDeadlineInMonth)
                  }
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
