import { useFormik } from 'formik';
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select
} from '@mui/material';
import landFormSchema from './LandFormSchema';
import { Button, Input } from '@/components/elements';
import { Props } from './@types';
import * as S from './LandFormStyled';
import { useEffect } from 'react';

const LandForm = ({ date, isShow, setDate, setIsShow, setIsValid }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      street: '',
      neighborhood: '',
      country: '',
      state: '',
      number: '',
      zipCode: '',
      area: 0,
      frontage: 0,
      topographyTypeId: 0,
      amountPerMeter: 0,
      totalAmount: 0,
      zoning: ''
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        address: {
          street: values.street,
          neighborhood: values.neighborhood,
          country: values.country,
          state: values.state,
          number: values.number,
          zipCode: values.zipCode
        },
        projectId: 0 // projectId
      };
      setDate({
        ...date,
        lands: {
          ...payload
        }
      });
      setIsValid(true);
      console.log('values ::', values);
      console.log('payload ::', payload);
    },
    validationSchema: landFormSchema
  });

  const {
    values,
    touched,
    errors,
    isValid,
    handleBlur,
    handleSubmit,
    handleChange
  } = formik;

  useEffect(() => {
    setIsValid(!isValid && Boolean(values.name));
  }, [values, isValid, setIsValid]);
  return (
    <S.LandFormContainer>
      <S.Form onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <Grid
            container
            mt={6}
            mb={6}
            xs={12}
            sm={12}
            md={12}
            rowGap={1}
            columnGap={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={3} minWidth={400}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Input
                  id="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-describedby="name"
                  placeholder="Nome do projeto"
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={1.4} minWidth={180}>
              <Button
                size="large"
                noActive={values.name.length < 5}
                disabled={values.name.length < 5}
                onClick={() => setIsShow(true)}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
          {isShow && (
            <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
              <Grid item xs={12} sm={6} md={4} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Endereço</S.Label>
                  <Input
                    id="street"
                    onChange={handleChange}
                    aria-describedby="street"
                    value={values.street}
                    placeholder="Digite o endereço"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.street && errors.street}
                    error={touched.street && Boolean(errors.street)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Bairro</S.Label>
                  <Input
                    id="neighborhood"
                    onChange={handleChange}
                    placeholder="Digite o bairro"
                    aria-describedby="neighborhood"
                    value={values.neighborhood}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.neighborhood && errors.neighborhood}
                    error={touched.neighborhood && Boolean(errors.neighborhood)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>País</S.Label>
                  <Input
                    id="country"
                    name="country"
                    onChange={handleChange}
                    aria-describedby="country"
                    placeholder="Digite o país"
                    value={values.country}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.country && errors.country}
                    error={touched.country && Boolean(errors.country)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Estado</S.Label>
                  <Input
                    id="state"
                    onChange={handleChange}
                    aria-describedby="state"
                    placeholder="Digite o estado"
                    value={values.state}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.state && errors.state}
                    error={touched.state && Boolean(errors.state)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Número</S.Label>
                  <Input
                    id="number"
                    onChange={handleChange}
                    aria-describedby="number"
                    placeholder="Digite o número"
                    value={values.number}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.number && errors.number}
                    error={touched.number && Boolean(errors.number)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Cep</S.Label>
                  <Input
                    id="zipCode"
                    onChange={handleChange}
                    aria-describedby="zipCode"
                    placeholder="Digite o Cep"
                    value={values.zipCode}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.zipCode && errors.zipCode}
                    error={touched.zipCode && Boolean(errors.zipCode)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Área total (m²)</S.Label>
                  <Input
                    id="area"
                    value={values.area}
                    onChange={handleChange}
                    aria-describedby="area"
                    placeholder="Digite a Área total"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.area && errors.area}
                    error={touched.area && Boolean(errors.area)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(m²)</InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Testada </S.Label>
                  <Input
                    id="frontage"
                    value={values.frontage}
                    onChange={handleChange}
                    aria-describedby="frontage"
                    placeholder="Digite aqui"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.frontage && errors.frontage}
                    error={touched.frontage && Boolean(errors.frontage)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(m²)</InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Topografia</S.Label>

                  <Select
                    displayEmpty
                    name="topographyTypeId"
                    onChange={handleChange}
                    value={values.topographyTypeId}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={''} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={0}>Plano</MenuItem>
                    <MenuItem value={1}>Block</MenuItem>
                    <MenuItem value={2}>Block</MenuItem>
                    <MenuItem value={3}>Block</MenuItem>
                    <MenuItem value={4}>Block</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Valor (m²) </S.Label>
                  <Input
                    id="amountPerMeter"
                    onChange={handleChange}
                    placeholder="Digite o valor"
                    value={values.amountPerMeter}
                    aria-describedby="amountPerMeter"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.amountPerMeter && errors.amountPerMeter}
                    error={
                      touched.amountPerMeter && Boolean(errors.amountPerMeter)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(R$)</InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Valor total</S.Label>
                  <Input
                    id="totalAmount"
                    onChange={handleChange}
                    value={values.totalAmount}
                    aria-describedby="totalAmount"
                    placeholder="Digite o valor total"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.totalAmount && errors.totalAmount}
                    error={touched.totalAmount && Boolean(errors.totalAmount)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(R$)</InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Zoneamento</S.Label>
                  <Select
                    displayEmpty
                    name="zoning"
                    value={values.zoning}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={''} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={0}>(ZM)</MenuItem>
                    <MenuItem value={1}>Block</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>
                    <MenuItem value={3}>To Do</MenuItem>
                    <MenuItem value={4}>In Review</MenuItem>
                    <MenuItem value={5}>In Progress</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </S.ContainerInputs>
          )}
        </Grid>
      </S.Form>
    </S.LandFormContainer>
  );
};

export { LandForm };
