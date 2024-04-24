import { useFormik } from 'formik';
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select
} from '@mui/material';
import UnitsFormSchema from './UnitsFormSchema';
import { Button, Input } from '@/components/elements';
import * as S from './UnitsFormStyled';

const UnitsForm = () => {
  const formik = useFormik({
    initialValues: {
      unitTypeId: 0,
      averageArea: '',
      marketAmount: '',
      unitQuantity: '',
      areaPrivativaTotal: '',
      area: '',
      exchangeQuantity: '',
      totalExchangeArea: '',
      netAmount: '',
      flooring: '',
      unitPerFloor: '',
      underground: '',
      totalUnitsInDevelopment: '',
      totalPrivateAreaQuantity: '',
      totalBuiltArea: '',
      totalToBeBuiltArea: '',
      totalPrivateArea: '',
      totalValueNoExchange: '',
      averageSaleValue: ''
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        unit: {
          unitTypeId: values.unitTypeId,
          averageArea: values.averageArea,
          marketAmount: values.marketAmount
        },
        projectId: 0 //
      };
      console.log('values ::', values);
      console.log('payload ::', payload);
    },
    validationSchema: UnitsFormSchema
  });

  const { values, touched, errors, handleSubmit, handleChange } = formik;

  return (
    <S.UnitsFormContainer>
      <S.Form onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }} rowGap={1}>
            <Grid item xs={12} sm={6} md={1.5} minWidth={170}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Tipos de unidades </S.Label>

                <Select
                  displayEmpty
                  name="unitTypeId"
                  onChange={handleChange}
                  value={values.unitTypeId}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={''} disabled>
                    <em>Selecione a opção </em>
                  </MenuItem>
                  <MenuItem value={0}>Residencial</MenuItem>
                  <MenuItem value={1}>Não Residencial </MenuItem>
                  <MenuItem value={2}>Loja</MenuItem>
                  <MenuItem value={3}>Vagas</MenuItem>
                  <MenuItem value={4}>HMP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1} minWidth={120}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Quantidade</S.Label>
                <Input
                  id="unitQuantity"
                  onChange={handleChange}
                  value={values.unitQuantity}
                  aria-describedby="unitQuantity"
                  placeholder="Digite a quantidade"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.unitQuantity && errors.unitQuantity}
                  error={touched.unitQuantity && Boolean(errors.unitQuantity)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1} minWidth={110}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Area média</S.Label>
                <Input
                  id="averageArea"
                  value={values.averageArea}
                  onChange={handleChange}
                  aria-describedby="averageArea"
                  placeholder="Digite a area"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.averageArea && errors.averageArea}
                  error={touched.averageArea && Boolean(errors.averageArea)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1.5} minWidth={165}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>A. Privativa total</S.Label>
                <Input
                  id="areaPrivativaTotal"
                  onChange={handleChange}
                  value={values.areaPrivativaTotal}
                  placeholder="Digite a area total "
                  aria-describedby="areaPrivativaTotal"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    touched.areaPrivativaTotal && errors.areaPrivativaTotal
                  }
                  error={
                    touched.areaPrivativaTotal &&
                    Boolean(errors.areaPrivativaTotal)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1} minWidth={115}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Área</S.Label>
                <Input
                  id="area"
                  value={values.area}
                  onChange={handleChange}
                  aria-describedby="area"
                  placeholder="Digite a área"
                  helperText={touched.area && errors.area}
                  error={touched.area && Boolean(errors.area)}
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1} minWidth={140}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Qtd permutas</S.Label>
                <Input
                  id="exchangeQuantity"
                  onChange={handleChange}
                  value={values.exchangeQuantity}
                  placeholder="Digite a quantidade"
                  aria-describedby="exchangeQuantity"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    touched.exchangeQuantity && errors.exchangeQuantity
                  }
                  error={
                    touched.exchangeQuantity && Boolean(errors.exchangeQuantity)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1.5} minWidth={160}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Área permutas</S.Label>
                <Input
                  id="totalExchangeArea"
                  onChange={handleChange}
                  placeholder="Digite a area"
                  value={values.totalExchangeArea}
                  aria-describedby="totalExchangeArea"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={
                    touched.totalExchangeArea && errors.totalExchangeArea
                  }
                  error={
                    touched.totalExchangeArea &&
                    Boolean(errors.totalExchangeArea)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">(m²)</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1.5} minWidth={160}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Valor de mercado </S.Label>
                <Input
                  id="marketAmount"
                  onChange={handleChange}
                  placeholder="Digite o valor"
                  aria-describedby="marketAmount"
                  value={values.marketAmount}
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.marketAmount && errors.marketAmount}
                  error={touched.marketAmount && Boolean(errors.marketAmount)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">R$</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={1.5} minWidth={160}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>VGV líquido</S.Label>
                <Input
                  id="netAmount"
                  value={values.netAmount}
                  onChange={handleChange}
                  aria-describedby="netAmount"
                  placeholder="Digite o valor"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  helperText={touched.netAmount && errors.netAmount}
                  error={touched.netAmount && Boolean(errors.netAmount)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">(R$)</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={0.5}>
              <Button size="30px">+</Button>
            </Grid>
          </S.ContainerInputs>
        </Grid>

        <Grid container spacing={{ xs: 0, sm: 2 }} rowGap={1}>
          <Grid item xs={12} sm={6} md={1.5} minWidth={200}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Pavimentos </S.Label>
              <Input
                id="flooring"
                onChange={handleChange}
                value={values.flooring}
                aria-describedby="flooring"
                placeholder="Digite a quantidade"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={touched.flooring && errors.flooring}
                error={touched.flooring && Boolean(errors.flooring)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5} minWidth={200}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Unidades por andar</S.Label>
              <Input
                id="unitPerFloor"
                onChange={handleChange}
                value={values.unitPerFloor}
                aria-describedby="unitPerFloor"
                placeholder="Digite a quantidade"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={touched.unitPerFloor && errors.unitPerFloor}
                error={touched.unitPerFloor && Boolean(errors.unitPerFloor)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2} minWidth={200}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Subsolos</S.Label>
              <Input
                id="underground"
                onChange={handleChange}
                value={values.underground}
                aria-describedby="underground"
                placeholder="Digite o quantidade"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={touched.underground && errors.underground}
                error={touched.underground && Boolean(errors.underground)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} minWidth={280}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>U. Total no empreendimento </S.Label>
              <Input
                onChange={handleChange}
                id="totalUnitsInDevelopment"
                placeholder="Digite a quantidade"
                value={values.totalUnitsInDevelopment}
                aria-describedby="totalUnitsInDevelopment"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={
                  touched.totalUnitsInDevelopment &&
                  errors.totalUnitsInDevelopment
                }
                error={
                  touched.totalUnitsInDevelopment &&
                  Boolean(errors.totalUnitsInDevelopment)
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2} minWidth={200}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Total de area privativa </S.Label>
              <Input
                id="totalPrivateAreaQuantity"
                onChange={handleChange}
                value={values.totalPrivateAreaQuantity}
                placeholder="Digite a quantidade"
                aria-describedby="totalPrivateAreaQuantity"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={
                  touched.totalPrivateAreaQuantity &&
                  errors.totalPrivateAreaQuantity
                }
                error={
                  touched.totalPrivateAreaQuantity &&
                  Boolean(errors.totalPrivateAreaQuantity)
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2} minWidth={210}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Total de area construída </S.Label>
              <Input
                id="totalBuiltArea"
                onChange={handleChange}
                value={values.totalBuiltArea}
                aria-describedby="totalBuiltArea"
                placeholder="Digite a quantidade"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={touched.totalBuiltArea && errors.totalBuiltArea}
                error={touched.totalBuiltArea && Boolean(errors.totalBuiltArea)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m²</InputAdornment>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5} minWidth={235}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Área total a construir (m²) </S.Label>
              <Input
                id="totalToBeBuiltArea"
                onChange={handleChange}
                value={values.totalToBeBuiltArea}
                aria-describedby="totalToBeBuiltArea"
                placeholder="Digite a quantidade"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={
                  touched.totalToBeBuiltArea && errors.totalToBeBuiltArea
                }
                error={
                  touched.totalToBeBuiltArea &&
                  Boolean(errors.totalToBeBuiltArea)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m²</InputAdornment>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5} minWidth={220}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Área total privativa (m²) </S.Label>
              <Input
                id="totalPrivateArea"
                onChange={handleChange}
                value={values.totalPrivateArea}
                aria-describedby="totalPrivateArea"
                placeholder="Digite a quantidade"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={touched.totalPrivateArea && errors.totalPrivateArea}
                error={
                  touched.totalPrivateArea && Boolean(errors.totalPrivateArea)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m²</InputAdornment>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2} minWidth={340}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Área total privativa sem permuta (m²) </S.Label>
              <Input
                id="totalValueNoExchange"
                onChange={handleChange}
                placeholder="Digite a quantidade"
                value={values.totalValueNoExchange}
                aria-describedby="totalValueNoExchange"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={
                  touched.totalValueNoExchange && errors.totalValueNoExchange
                }
                error={
                  touched.totalValueNoExchange &&
                  Boolean(errors.totalValueNoExchange)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m²</InputAdornment>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} minWidth={280}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <S.Label>Valor médio de venda (m²) </S.Label>
              <Input
                id="averageSaleValue"
                onChange={handleChange}
                value={values.averageSaleValue}
                aria-describedby="averageSaleValue"
                placeholder="Digite a quantidade"
                inputProps={{ style: { fontSize: '1.4rem' } }}
                helperText={touched.averageSaleValue && errors.averageSaleValue}
                error={
                  touched.averageSaleValue && Boolean(errors.averageSaleValue)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">R$</InputAdornment>
                  )
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </S.Form>
    </S.UnitsFormContainer>
  );
};

export { UnitsForm };
