import { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select
} from '@mui/material';
import { Props } from './@types';
import { MaskType } from '@/utils/types';
import { Button, Input } from '@/components/elements';
import { formatCurrency, typeMask } from '@/utils/utils';
import { landFormSchema, projectNameFormSchema } from './Schema';
import * as S from './LandFormStyled';
import { useNavigate } from 'react-router-dom';
import { handleSumValues } from '../UnitsForm/utils';

const LandForm = ({ date, isShow, setDate, handleStep, setIsShow }: Props) => {
  const navigate = useNavigate();

  const formikProjectName = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: async (values) => {
      setIsShow(true);
      setDate({
        ...date,
        projectId: 0,
        lands: {
          ...date.lands,
          name: values.name
        }
      });
    },
    validationSchema: projectNameFormSchema
  });

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
      zoning: 'ZM'
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
      handleStep(2);
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
    handleChange,
    setFieldValue
  } = formik;

  useEffect(() => {
    if (!formikProjectName.values.name) {
      setIsShow(false);
    }
  }, [formikProjectName, setIsShow]);

  useEffect(() => {
    if (date.lands.name) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lands: any = date.lands;
      Object.keys(lands).forEach((key: string) => {
        setFieldValue(key, lands[key]);
      });
      setIsShow(true);
      formikProjectName.setFieldValue('name', lands.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setFieldValue]);

  return (
    <S.LandFormContainer>
      <Grid container spacing={{ xs: 0, sm: 2 }}>
        <S.Form onSubmit={formikProjectName.handleSubmit}>
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
            <Grid item xs={12} sm={12} md={3} minWidth={400} minHeight={80}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Input
                  id="name"
                  value={formikProjectName.values.name}
                  onBlur={formikProjectName.handleBlur}
                  onChange={(e) => {
                    setIsShow(false);
                    formikProjectName.handleChange(e);
                  }}
                  aria-describedby="name"
                  placeholder="Cadastrar nome do projeto"
                  helperText={
                    formikProjectName.touched.name &&
                    formikProjectName.errors.name
                  }
                  error={
                    formikProjectName.touched.name &&
                    Boolean(formikProjectName.errors.name)
                  }
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={1.4} minWidth={180} minHeight={80}>
              <Button
                size="large"
                type="submit"
                noActive={formikProjectName.isValidating}
                disabled={formikProjectName.isValidating}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
        </S.Form>
        <S.Form onSubmit={handleSubmit}>
          {isShow && (
            <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
              <Grid item xs={12} sm={6} md={4} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Endereço</S.Label>
                  <Input
                    required
                    id="street"
                    onBlur={handleBlur}
                    value={values.street}
                    onChange={handleChange}
                    aria-describedby="street"
                    placeholder="Digite o endereço"
                    helperText={touched.street && errors.street}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    error={touched.street && Boolean(errors.street)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Bairro</S.Label>
                  <Input
                    required
                    id="neighborhood"
                    onBlur={handleBlur}
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
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>País</S.Label>
                  <Input
                    required
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
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Estado</S.Label>
                  <Input
                    id="state"
                    required
                    value={values.state}
                    onChange={handleChange}
                    aria-describedby="state"
                    placeholder="Digite o estado"
                    inputProps={{
                      style: { fontSize: '1.4rem' },
                      maxLength: 2
                    }}
                    helperText={touched.state && errors.state}
                    error={touched.state && Boolean(errors.state)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Número</S.Label>
                  <Input
                    id="number"
                    required
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
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Cep</S.Label>
                  <Input
                    required
                    id="zipCode"
                    onChange={handleChange}
                    aria-describedby="zipCode"
                    placeholder="Digite o Cep"
                    value={typeMask(MaskType.CEP, values.zipCode)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.zipCode && errors.zipCode}
                    error={touched.zipCode && Boolean(errors.zipCode)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Área total (m²)</S.Label>
                  <Input
                    id="area"
                    required
                    onBlur={(e) => {
                      handleSumValues({
                        id: '',
                        setFieldValue,
                        type: 'sumLand',
                        setListUnit: () => {},
                        value1: e.target.value,
                        fieldName: 'totalAmount',
                        value2: values.amountPerMeter.toString()
                      });
                    }}
                    onChange={handleChange}
                    aria-describedby="area"
                    placeholder="Digite a Área total"
                    helperText={touched.area && errors.area}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={typeMask(MaskType.NUMBER, values.area.toString())}
                    error={touched.area && Boolean(errors.area)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(m²)</InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Testada </S.Label>
                  <Input
                    required
                    id="frontage"
                    onChange={handleChange}
                    aria-describedby="frontage"
                    placeholder="Digite aqui"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.frontage && errors.frontage}
                    value={typeMask(
                      MaskType.NUMBER,
                      values.frontage.toString()
                    )}
                    error={touched.frontage && Boolean(errors.frontage)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(m²)</InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Topografia</S.Label>

                  <Select
                    required
                    displayEmpty
                    name="topographyTypeId"
                    onChange={handleChange}
                    className="SelectComponent"
                    value={values.topographyTypeId}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={1}>Plano</MenuItem>
                    <MenuItem value={2}>Declive</MenuItem>
                    <MenuItem value={3}>Aclive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Valor (m²) </S.Label>
                  <Input
                    required
                    id="amountPerMeter"
                    onBlur={(e) => {
                      handleSumValues({
                        id: '',
                        setFieldValue,
                        type: 'sumLand',
                        setListUnit: () => {},
                        value2: e.target.value,
                        value1: values.area.toString(),
                        fieldName: 'totalAmount'
                      });
                    }}
                    onChange={handleChange}
                    placeholder="Digite o valor"
                    value={formatCurrency(values.amountPerMeter.toString())}
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
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Valor total</S.Label>
                  <Input
                    required
                    disabled
                    id="totalAmount"
                    onChange={handleChange}
                    aria-describedby="totalAmount"
                    placeholder="Digite o valor total"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={touched.totalAmount && errors.totalAmount}
                    value={formatCurrency(values.totalAmount.toString())}
                    error={touched.totalAmount && Boolean(errors.totalAmount)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(R$)</InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200} minHeight={117}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Zoneamento</S.Label>
                  <Select
                    required
                    displayEmpty
                    name="zoning"
                    value={values.zoning}
                    onChange={handleChange}
                    className="SelectComponent"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={''} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={1}>(ZM)</MenuItem>
                    <MenuItem value={2}>(ZC)</MenuItem>
                    <MenuItem value={3}>(ZEU)</MenuItem>
                    <MenuItem value={4}>(ZER)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </S.ContainerInputs>
          )}
          <S.ContainerButtons>
            <Button isOutline size="80px" onClick={() => navigate('/home')}>
              Cancelar
            </Button>
            <Button
              size="100px"
              type="submit"
              disabled={isValid && !isShow}
              noActive={isValid && !isShow}
            >
              Proximo
            </Button>
          </S.ContainerButtons>
        </S.Form>
      </Grid>
    </S.LandFormContainer>
  );
};

export { LandForm };
