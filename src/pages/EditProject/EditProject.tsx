import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Layout } from '@/components/organism';
import { Button, Input } from '@/components/elements';
import { HeaderBreadcrumbs } from '@/components/organism';
import { breadCrumbsItems, handleTabs } from './utils';
import {
  MaskType,
  emptyProjectInfo,
  emptyUnitSummary,
  projectInfoType,
  unitSummaryType
} from '@/utils/types';
import { getInfoProject } from './services';
import * as S from './EditProjectStyled';
import { SnackbarContext } from '@/contexts/Snackbar';
import { useFormik } from 'formik';
import { formatCurrency, typeMask } from '@/utils/utils';
import {
  handleChangeUnit,
  handleSumValues
} from '@/components/organism/UnitsForm/utils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export const EditProject = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [searchParams] = useSearchParams();
  const { setSnackbar } = useContext(SnackbarContext);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<projectInfoType>(emptyProjectInfo);
  const [listUnit, setListUnit] = useState<Array<unitSummaryType>>([
    emptyUnitSummary
  ]);
  console.log('date ::', date);

  const formikLand = useFormik({
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
      zoning: 0
    },
    onSubmit: async (values) => {
      console.log('values ::', values);
    }
  });

  const formikUnit = useFormik({
    initialValues: {
      unitTypeId: 0,
      averageArea: '',
      marketAmount: '',
      unitQuantity: '',
      areaPrivativaTotal: '',
      exchangeQuantity: '',
      totalExchangeArea: '',
      netAmount: '',
      flooring: '',
      unitPerFloor: '',
      underground: '',
      totalUnitsInDevelopment: '',
      totalPrivateAreaQuantity: '',
      totalToBeBuiltArea: '',
      totalValueNoExchange: '',
      averageSaleValue: ''
    },
    onSubmit: async (values) => {
      console.log('values ::', values);
      // const payload = {
      //   projectId: id, // projectId
      //   unit: date.unitHub.unit,
      //   flooring: values.flooring,
      //   underground: values.underground,
      //   unitPerFloor: values.unitPerFloor,
      //   averageSaleValue: values.averageSaleValue,
      //   totalToBeBuiltArea: values.totalToBeBuiltArea,
      //   totalValueNoExchange: values.totalValueNoExchange,
      //   totalUnitsInDevelopment: values.totalUnitsInDevelopment
      // };
    }
  });

  const formikDeadline = useFormik({
    initialValues: {
      startDate: '',
      totalDeadlineInMonth: '',
      approvalDeadlineInMonth: '',
      constructionDeadlineInMonth: ''
    },
    onSubmit: async (values) => {
      console.log('values ::', values);
    }
  });

  const { values, touched, errors, handleBlur, handleSubmit, handleChange } =
    formikLand;

  const emptyVgv =
    formikUnit.values.marketAmount &&
    formikUnit.values.marketAmount &&
    formikUnit.values.marketAmount;

  const handleNewUnit = () => {
    const UnitDfault = {
      id: uuidv4(),
      netAmount: '',
      unitTypeId: 0,
      averageArea: '',
      unitQuantity: '',
      marketAmount: '',
      exchangeQuantity: '',
      totalExchangeArea: '',
      areaPrivativaTotal: ''
    };
    setListUnit((prevList) => [
      ...prevList.map((unit) => ({
        ...unit,
        isRemove: true
      })),
      {
        ...UnitDfault,
        id: uuidv4(),
        isRemove: false
      }
    ]);
  };

  const handleRemoveUnit = (id: string) => {
    setListUnit((prevList) => prevList.filter((unit) => unit.id !== id));
  };

  useEffect(() => {
    getInfoProject({ id: parseFloat(id), setDate, setSnackbar });
  }, [id, setSnackbar]);

  return (
    <Layout>
      <S.EditProjectContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(name)} />
          <Button isOutline size="200px" onClick={() => navigate('/home')}>
            Cancelar
          </Button>
        </S.Header>
        <S.Content>
          <Box sx={{ width: '100%' }} padding={0}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={(_e, index) => {
                  handleTabs({ newValue: index, setValue });
                }}
                aria-label="basic tabs example"
              >
                <Tab label="Terreno" {...a11yProps(0)} />
                <Tab label="Unidades" {...a11yProps(1)} />
                <Tab label="Áreas" {...a11yProps(2)} disabled />
                <Tab label="Prazos" {...a11yProps(3)} />
                <Tab label="Contas" {...a11yProps(4)} disabled />
                <Tab label="Rentabilidade" {...a11yProps(5)} disabled />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <S.Form onSubmit={handleSubmit}>
                <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Endereço</S.Label>
                      <Input
                        required
                        id="street"
                        onBlur={handleBlur}
                        value={values.street}
                        onChange={handleChange}
                        aria-describedby="street"
                        placeholder="Digite o endereço"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        error={touched.street && Boolean(errors.street)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                        error={
                          touched.neighborhood && Boolean(errors.neighborhood)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Área total (m²)</S.Label>
                      <Input
                        id="area"
                        required
                        onChange={handleChange}
                        aria-describedby="area"
                        placeholder="Digite a Área total"
                        helperText={touched.area && errors.area}
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        value={typeMask(
                          MaskType.NUMBER,
                          values.area.toString()
                        )}
                        error={touched.area && Boolean(errors.area)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">(m²)</InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                        <MenuItem value={2}>Decline</MenuItem>
                        <MenuItem value={3}>Aclive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Valor (m²) </S.Label>
                      <Input
                        required
                        id="amountPerMeter"
                        onChange={handleChange}
                        placeholder="Digite o valor"
                        value={formatCurrency(values.amountPerMeter.toString())}
                        aria-describedby="amountPerMeter"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        helperText={
                          touched.amountPerMeter && errors.amountPerMeter
                        }
                        error={
                          touched.amountPerMeter &&
                          Boolean(errors.amountPerMeter)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">(R$)</InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Valor total</S.Label>
                      <Input
                        required
                        id="totalAmount"
                        onChange={handleChange}
                        aria-describedby="totalAmount"
                        placeholder="Digite o valor total"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        helperText={touched.totalAmount && errors.totalAmount}
                        value={formatCurrency(values.totalAmount.toString())}
                        error={
                          touched.totalAmount && Boolean(errors.totalAmount)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">(R$)</InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    minWidth={200}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
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
                        <MenuItem value={0} disabled>
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

                <S.ContainerButtons>
                  <Button isOutline size="80px" onClick={() => navigate('/')}>
                    Cancelar
                  </Button>
                  <Button size="100px" type="submit">
                    Proximo
                  </Button>
                </S.ContainerButtons>
              </S.Form>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <S.Form onSubmit={handleSubmit}>
                <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
                  <Grid
                    pt={5}
                    pl={4}
                    mb={2}
                    container
                    spacing={{ xs: 0, sm: 2 }}
                    rowGap={4}
                  >
                    {listUnit.map((unit, index) => (
                      <S.ContainerInputs
                        pl={0.5}
                        container
                        rowGap={1}
                        key={unit.id}
                        spacing={{ xs: 0, sm: 2 }}
                      >
                        <Grid item xs={12} sm={6} md={1.5} minWidth={170}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Tipos de unidades </S.Label>

                            <Select
                              required
                              displayEmpty
                              name="unitTypeId"
                              onBlur={handleBlur}
                              value={unit.unitTypeId}
                              className="SelectComponent"
                              id={`unitTypeId-${unit.id}`}
                              inputProps={{ 'aria-label': 'Without label' }}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'unitTypeId',
                                  value: e.target.value
                                })
                              }
                            >
                              <MenuItem value={0} disabled>
                                <em>Selecione a opção </em>
                              </MenuItem>
                              <MenuItem value={1}>Residencial</MenuItem>
                              <MenuItem value={2}>Não Residencial </MenuItem>
                              <MenuItem value={3}>Loja</MenuItem>
                              <MenuItem value={4}>Vagas</MenuItem>
                              <MenuItem value={5}>HMP</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.3} minWidth={120}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Quantidade</S.Label>
                            <Input
                              required
                              onBlur={(e) => {
                                formikUnit.setFieldValue(
                                  'unitQuantity',
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: e.target.value,
                                  value2: unit.averageArea.toString(),
                                  fieldName: 'areaPrivativaTotal',
                                  setListUnit
                                });
                                handleSumValues({
                                  id: unit.id,
                                  type: 'mult',
                                  value1: unit.marketAmount.toString(),
                                  value2: e.target.value,
                                  value3: unit.exchangeQuantity.toString(),
                                  fieldName: 'netAmount',
                                  setListUnit
                                });
                              }}
                              id={`unitQuantity-${unit.id}`}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'unitQuantity',
                                  value: e.target.value
                                })
                              }
                              value={typeMask(
                                MaskType.NUMBER,
                                unit.unitQuantity.toString()
                              )}
                              aria-describedby="unitQuantity"
                              placeholder="Digite a quantidade"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1} minWidth={180}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Area média</S.Label>
                            <Input
                              required
                              onBlur={(e) => {
                                formikUnit.setFieldValue(
                                  'unitQuantity',
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: e.target.value,
                                  value2: unit.unitQuantity.toString(),
                                  fieldName: 'areaPrivativaTotal',
                                  setListUnit
                                });
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: e.target.value,
                                  value2: unit.exchangeQuantity.toString(),
                                  fieldName: 'totalExchangeArea',
                                  setListUnit
                                });
                              }}
                              id={`averageArea-${unit.id}`}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'averageArea',
                                  value: e.target.value
                                })
                              }
                              value={unit.averageArea}
                              aria-describedby="averageArea"
                              placeholder="Digite a area"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.3} minWidth={165}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>A. Privativa total</S.Label>
                            <Input
                              disabled
                              onBlur={handleBlur}
                              id={`areaPrivativaTotal-${unit.id}`}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'areaPrivativaTotal',
                                  value: e.target.value
                                })
                              }
                              value={unit.areaPrivativaTotal}
                              placeholder="A. Privativa"
                              aria-describedby="areaPrivativaTotal"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.5} minWidth={180}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Qtd permutas</S.Label>
                            <Input
                              required
                              onBlur={(e) => {
                                formikUnit.setFieldValue(
                                  'exchangeQuantity',
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: unit.averageArea.toString(),
                                  value2: e.target.value,
                                  fieldName: 'totalExchangeArea',
                                  setListUnit
                                });
                                handleSumValues({
                                  id: unit.id,
                                  type: 'mult',
                                  value1: unit.marketAmount.toString(),
                                  value2: unit.unitQuantity.toString(),
                                  value3: e.target.value,
                                  fieldName: 'netAmount',
                                  setListUnit
                                });
                              }}
                              id={`exchangeQuantity-${unit.id}`}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'exchangeQuantity',
                                  value: e.target.value
                                })
                              }
                              value={unit.exchangeQuantity}
                              placeholder="Digite a quantidade"
                              aria-describedby="exchangeQuantity"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.5} minWidth={285}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Área total permutada</S.Label>
                            <Input
                              required
                              disabled
                              onBlur={handleBlur}
                              id={`totalExchangeArea-${unit.id}`}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'totalExchangeArea',
                                  value: e.target.value
                                })
                              }
                              value={unit.totalExchangeArea}
                              placeholder="Digite a area"
                              aria-describedby="totalExchangeArea"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    (m²)
                                  </InputAdornment>
                                )
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.5} minWidth={160}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Valor de mercado </S.Label>
                            <Input
                              required
                              onBlur={(e) => {
                                formikUnit.setFieldValue(
                                  'marketAmount',
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'mult',
                                  value1: e.target.value,
                                  value2: unit.unitQuantity.toString(),
                                  value3: unit.exchangeQuantity.toString(),
                                  fieldName: 'netAmount',
                                  setListUnit
                                });
                              }}
                              id={`marketAmount-${unit.id}`}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'marketAmount',
                                  value: formatCurrency(e.target.value)
                                })
                              }
                              value={unit.marketAmount}
                              placeholder="Digite o valor"
                              aria-describedby="marketAmount"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    R$
                                  </InputAdornment>
                                )
                              }}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={1.5} minWidth={160}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>VGV líquido</S.Label>
                            <Input
                              required
                              disabled
                              onBlur={handleBlur}
                              id={`netAmount-${unit.id}`}
                              onChange={(e) =>
                                handleChangeUnit({
                                  index,
                                  setListUnit,
                                  field: 'netAmount',
                                  value: e.target.value
                                })
                              }
                              value={emptyVgv ? unit.netAmount : ''}
                              aria-describedby="netAmount"
                              placeholder="Digite o valor"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    (R$)
                                  </InputAdornment>
                                )
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={0.5}
                          className="containerButton"
                        >
                          {unit.isRemove ? (
                            <Button
                              size="30px"
                              className="btn_remove"
                              onClick={() => handleRemoveUnit(unit.id)}
                            >
                              -
                            </Button>
                          ) : (
                            <Button size="30px" onClick={() => handleNewUnit()}>
                              +
                            </Button>
                          )}
                        </Grid>
                      </S.ContainerInputs>
                    ))}
                  </Grid>

                  <Grid
                    container
                    spacing={{ xs: 0, sm: 2 }}
                    rowGap={1}
                    pl={0.3}
                  >
                    <Grid item xs={12} sm={6} md={1.5} minWidth={200}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>Pavimentos </S.Label>
                        <Input
                          required
                          onBlur={handleBlur}
                          id="flooring"
                          onChange={handleChange}
                          value={formikUnit.values.flooring}
                          aria-describedby="flooring"
                          placeholder="Digite a quantidade"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={1.5} minWidth={200}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>Unidades por andar</S.Label>
                        <Input
                          required
                          onBlur={handleBlur}
                          id="unitPerFloor"
                          onChange={handleChange}
                          value={formikUnit.values.unitPerFloor}
                          aria-describedby="unitPerFloor"
                          placeholder="Digite a quantidade"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} minWidth={200}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>Subsolos</S.Label>
                        <Input
                          required
                          onBlur={handleBlur}
                          id="underground"
                          onChange={handleChange}
                          value={formikUnit.values.underground}
                          aria-describedby="underground"
                          placeholder="Digite o quantidade"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} minWidth={280}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>U. Total no empreendimento </S.Label>
                        <Input
                          required
                          disabled
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="totalUnitsInDevelopment"
                          placeholder="Digite a quantidade"
                          value={formikUnit.values.totalUnitsInDevelopment}
                          aria-describedby="totalUnitsInDevelopment"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} minWidth={200}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>Total de area privativa </S.Label>
                        <Input
                          required
                          disabled
                          onBlur={handleBlur}
                          id="totalPrivateAreaQuantity"
                          onChange={handleChange}
                          value={formikUnit.values.totalPrivateAreaQuantity}
                          placeholder="Digite a quantidade"
                          aria-describedby="totalPrivateAreaQuantity"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={1.5} minWidth={235}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>Área total a construir (m²) </S.Label>
                        <Input
                          required
                          onBlur={handleBlur}
                          id="totalToBeBuiltArea"
                          onChange={handleChange}
                          value={formikUnit.values.totalToBeBuiltArea}
                          aria-describedby="totalToBeBuiltArea"
                          placeholder="Digite a quantidade"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">m²</InputAdornment>
                            )
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2} minWidth={340}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>
                          Área total privativa sem permuta (m²){' '}
                        </S.Label>
                        <Input
                          required
                          // disabled
                          onBlur={handleBlur}
                          id="totalValueNoExchange"
                          onChange={handleChange}
                          placeholder="Digite a quantidade"
                          value={formikUnit.values.totalValueNoExchange}
                          aria-describedby="totalValueNoExchange"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">m²</InputAdornment>
                            )
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} minWidth={280}>
                      <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                      >
                        <S.Label>Valor médio de venda (m²) </S.Label>
                        <Input
                          required
                          // disabled
                          onBlur={handleBlur}
                          id="averageSaleValue"
                          onChange={handleChange}
                          value={formikUnit.values.averageSaleValue}
                          aria-describedby="averageSaleValue"
                          placeholder="Digite a quantidade"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">R$</InputAdornment>
                            )
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </S.ContainerInputs>

                <S.ContainerButtons>
                  <Button isOutline size="80px" onClick={() => navigate('/')}>
                    Cancelar
                  </Button>
                  <Button size="100px" type="submit">
                    Proximo
                  </Button>
                </S.ContainerButtons>
              </S.Form>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              Áreas
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <S.Form onSubmit={formikDeadline.handleSubmit}>
                <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
                  <Grid item xs={12} sm={12} md={3} minWidth={250}>
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Data de início</S.Label>
                      <Input
                        required
                        id="startDate"
                        onBlur={handleBlur}
                        value={typeMask(
                          MaskType.DATE,
                          formikDeadline.values.startDate
                        )}
                        onChange={handleChange}
                        aria-describedby="startDate"
                        placeholder="Digite a Data"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={250}>
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Aprovação do projeto </S.Label>
                      <Input
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="approvalDeadlineInMonth"
                        placeholder="Digite os meses"
                        value={formikDeadline.values.approvalDeadlineInMonth}
                        aria-describedby="approvalDeadlineInMonth"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">mes</InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={250}>
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Execução da obra </S.Label>
                      <Input
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Digite os meses"
                        id="constructionDeadlineInMonth"
                        value={
                          formikDeadline.values.constructionDeadlineInMonth
                        }
                        aria-describedby="constructionDeadlineInMonth"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">mes</InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} minWidth={250}>
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Prazo total</S.Label>
                      <Input
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="totalDeadlineInMonth"
                        placeholder="Digite os meses"
                        value={formikDeadline.values.totalDeadlineInMonth}
                        aria-describedby="totalDeadlineInMonth"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">mes</InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                </S.ContainerInputs>

                <S.ContainerButtons>
                  <Button isOutline size="80px" onClick={() => navigate('/')}>
                    Cancelar
                  </Button>
                  <Button size="100px" type="submit">
                    Proximo
                  </Button>
                </S.ContainerButtons>
              </S.Form>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={4}>
              Contas
            </CustomTabPanel>

            <CustomTabPanel value={value} index={5}>
              Rentabilidade
            </CustomTabPanel>
          </Box>
        </S.Content>
      </S.EditProjectContainer>
    </Layout>
  );
};
