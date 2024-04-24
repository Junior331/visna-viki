import { useFormik } from 'formik';
import { FormControl, Grid, InputAdornment } from '@mui/material';
import deadlinesFormSchema from './DeadlinesFormSchema';
import { Input } from '@/components/elements';
import * as S from './DeadlinesFormStyled';

const DeadlinesForm = () => {
  const formik = useFormik({
    initialValues: {
      startDate: '',
      projectApproval: '',
      executionWork: '',
      totalTime: ''
    },
    onSubmit: async (values) => {
      const payload = {
        id: 0, //
        projectId: 0, //
        totalDeadlineInMonth: 0, // Prazo total
        approvalDeadlineInMonth: 0, // Aprovação do projeto
        constructionDeadlineInMonth: 0, // Execução da obra
        startDate: '', // Data de início
        projectLaunchDeadlineInMonth: 0, //
        endDate: '' //
      };

      console.log('values ::', values);
      console.log('payload ::', payload);
    },
    validationSchema: deadlinesFormSchema
  });

  const { values, touched, errors, handleSubmit, handleChange } = formik;

  return (
    <S.DeadlinesFormContainer>
      <S.Form onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
            <Grid item xs={12} sm={12} md={3} minWidth={250}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Data de início</S.Label>
                <Input
                  id="startDate"
                  value={values.startDate}
                  onChange={handleChange}
                  aria-describedby="startDate"
                  placeholder="Digite a Data"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.startDate && errors.startDate}
                  error={touched.startDate && Boolean(errors.startDate)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">(m²)</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} minWidth={250}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Aprovação do projeto </S.Label>
                <Input
                  id="projectApproval"
                  value={values.projectApproval}
                  onChange={handleChange}
                  aria-describedby="projectApproval"
                  placeholder="Digite os meses"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.projectApproval && errors.projectApproval}
                  error={
                    touched.projectApproval && Boolean(errors.projectApproval)
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
                  id="executionWork"
                  value={values.executionWork}
                  onChange={handleChange}
                  aria-describedby="executionWork"
                  placeholder="Digite os meses"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.executionWork && errors.executionWork}
                  error={touched.executionWork && Boolean(errors.executionWork)}
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
                  id="totalTime"
                  value={values.totalTime}
                  onChange={handleChange}
                  aria-describedby="totalTime"
                  placeholder="Digite os meses"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.totalTime && errors.totalTime}
                  error={touched.totalTime && Boolean(errors.totalTime)}
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
      </S.Form>
    </S.DeadlinesFormContainer>
  );
};

export { DeadlinesForm };
