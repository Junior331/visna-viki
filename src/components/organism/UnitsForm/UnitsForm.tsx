/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { Grid, Select, MenuItem, FormControl } from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { Props } from './@types';
import unitsFormSchema from './UnitsFormSchema';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Button, Input } from '@/components/elements';
import { Tooltip } from '@/components/elements/Tooltip';
import { StepsIsDoneContext } from '@/contexts/StepIsDone';
import { MaskType, unitCharacteristicsType } from '@/utils/types';
import { calculateTUID, handleSumValues, unitDefault } from './utils';
import {
  formatCurrency,
  formatterV2,
  handleKeyDown,
  typeMask
} from '@/utils/utils';
import { handleListUnitCharacteristics } from '@/pages/EditProject/utils';
import * as S from './UnitsFormStyled';

const UnitsForm = ({ date, setDate, handleStep }: Props) => {
  const { setSnackbar } = useContext(SnackbarContext);
  const { stepsIsDone, setStepsIsDone } = useContext(StepsIsDoneContext);
  const [listCharacteristics, setListCharacteristics] = useState<
    unitCharacteristicsType[]
  >([]);
  const [selectedCharacteristics, setselectedCharacteristics] =
    useState<unitCharacteristicsType>();
  const formik = useFormik({
    initialValues: date.units,
    onSubmit: async (values) => {
      setDate({
        ...date,
        units: {
          ...values
        }
      });
      setStepsIsDone([...stepsIsDone, '2']);

      handleStep(3);
    },
    validationSchema: unitsFormSchema
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = formik;

  useEffect(() => {
    handleListUnitCharacteristics({
      setSnackbar,
      setListCharacteristics
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (date.units.flooring) {
      const units: any = date.units;
      units.unit.forEach((unit: any, index: number) => {
        Object.keys(unit).forEach((unitKey: string) => {
          const fieldName = `unit.${index}.${unitKey}`;
          setFieldValue(fieldName, unit[unitKey]);
        });
      });

      Object.keys(units).forEach((key: string) => {
        setFieldValue(key, units[key]);
      });
    }
  }, [date, setFieldValue]);

  useEffect(() => {
    const totalPrivateAreaQuantity = calculateTUID(
      values.unit,
      'areaPrivativaTotal'
    );
    const totalExchangeArea = calculateTUID(values.unit, 'areaExchanged');
    const netAmount = calculateTUID(values.unit, 'netAmount');
    const unitQuantity = calculateTUID(values.unit, 'unitQuantity');
    const exchangeQuantity = calculateTUID(values.unit, 'exchangeQuantity');
    const totalPrivateAreaNetOfExchange =
      parseFloat(values.totalAreaOfTheDevelopment) - totalExchangeArea;

    if (totalPrivateAreaNetOfExchange !== null) {
      setFieldValue(
        'totalPrivateAreaNetOfExchange',
        totalPrivateAreaNetOfExchange
      );
    }
    if (totalPrivateAreaQuantity !== null) {
      setFieldValue('totalPrivateAreaQuantity', totalPrivateAreaQuantity);
    }
    if (totalExchangeArea) {
      setFieldValue('totalExchangeArea', totalExchangeArea);
    }

    if (totalPrivateAreaQuantity !== null && totalExchangeArea !== null) {
      const totalValueNoExchange = totalPrivateAreaQuantity - totalExchangeArea;
      setFieldValue('totalValueNoExchange', totalValueNoExchange);
    }

    if (
      netAmount !== null &&
      unitQuantity !== null &&
      exchangeQuantity !== null
    ) {
      const sumUnitQuantity = unitQuantity - exchangeQuantity;
      const averageSaleValue =
        sumUnitQuantity !== 0 ? netAmount / sumUnitQuantity : 0;
      setFieldValue('averageSaleValue', averageSaleValue);
    }
  }, [values.unit, setFieldValue, values.totalAreaOfTheDevelopment]);

  useEffect(() => {
    setDate({
      ...date,
      units: {
        ...values
      }
    });
  }, [date, setDate, values]);

  return (
    <S.UnitsFormContainer>
      <FormikProvider value={formik}>
        <S.Form onSubmit={handleSubmit}>
          <S.ContainerInputs
            container
            className="bgWhite"
            spacing={{ xs: 0, sm: 2 }}
          >
            <FieldArray name="unit">
              {({ push, remove }) => {
                return (
                  <Grid
                    pl={4}
                    mb={2}
                    pt={2.5}
                    container
                    rowGap={4}
                    className="containerUnits"
                    spacing={{ xs: 0, sm: 2 }}
                  >
                    {values.unit.map((unit, index) => (
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
                            <Tooltip title={'Tipos de unidades'}>
                              <S.Label>T. Unidades </S.Label>
                            </Tooltip>

                            <Select
                              required
                              displayEmpty
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue(
                                  `unit[${index}].unitTypeId`,
                                  e.target.value
                                );
                                setFieldValue(
                                  `unit[${index}].unitCharacteristicsId`,
                                  ''
                                );
                                setselectedCharacteristics(
                                  listCharacteristics.find(
                                    (item) =>
                                      item.unit_type_id === e.target.value
                                  )
                                );
                                handleChange(e);
                              }}
                              className="SelectComponent"
                              id={`unitTypeId-${unit.id}`}
                              name={`unit[${index}].unitTypeId`}
                              value={values.unit[index].unitTypeId}
                              IconComponent={KeyboardArrowDownRounded}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value={0} disabled>
                                <em>Selecione a opção </em>
                              </MenuItem>
                              {listCharacteristics.map((item) => (
                                <MenuItem value={item.unit_type_id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        {Boolean(selectedCharacteristics?.children.length) && (
                          <Grid item xs={12} sm={6} md={1.5} minWidth={170}>
                            <FormControl
                              sx={{ m: 1, width: '25ch' }}
                              variant="outlined"
                            >
                              <S.Label>Características</S.Label>

                              <Select
                                displayEmpty
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  setFieldValue(
                                    `unit[${index}].unitCharacteristicsId`,
                                    e.target.value
                                  );
                                  handleChange(e);
                                }}
                                className="SelectComponent"
                                name={`unit[${index}].unitCharacteristicsId`}
                                value={
                                  values.unit[index].unitCharacteristicsId || ''
                                }
                                IconComponent={KeyboardArrowDownRounded}
                                inputProps={{
                                  'aria-label': 'Without label'
                                }}
                              >
                                <MenuItem value={''} disabled>
                                  <em>Selecione a opção </em>
                                </MenuItem>
                                {selectedCharacteristics?.children.map(
                                  (item) => (
                                    <MenuItem value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={6} md={1.3} minWidth={130}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Quantidade</S.Label>
                            <Input
                              required
                              onBlur={(e) => {
                                setFieldValue(
                                  `unit[${index}].unitQuantity`,
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: e.target.value,
                                  value2: unit.averageArea,
                                  fieldName: 'areaPrivativaTotal',
                                  setFieldValue
                                });
                              }}
                              id={`unitQuantity-${unit.id}`}
                              onChange={handleChange}
                              name={`unit[${index}].unitQuantity`}
                              value={typeMask(
                                MaskType.NUMBER,
                                values.unit[index].unitQuantity
                              )}
                              aria-describedby="unitQuantity"
                              placeholder="Digite a quantidade"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={0.8} minWidth={145}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <Tooltip title={'Área média'}>
                              <S.Label>A. Média</S.Label>
                            </Tooltip>
                            <Input
                              required
                              onBlur={(e) => {
                                setFieldValue(
                                  `unit[${index}].averageArea`,
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: e.target.value,
                                  value2: unit.unitQuantity.toString(),
                                  fieldName: 'areaPrivativaTotal',
                                  setFieldValue
                                });
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: e.target.value,
                                  value2: unit.exchangeQuantity.toString(),
                                  fieldName: 'areaExchanged',
                                  setFieldValue
                                });

                                handleSumValues({
                                  id: unit.id,
                                  type: 'mult',
                                  value1: unit.areaPrivativaTotal.toString(),
                                  value2: e.target.value,
                                  value3: unit.marketAmount.toString(),
                                  fieldName: 'netAmount',
                                  setFieldValue
                                });
                              }}
                              id={`averageArea-${unit.id}`}
                              onChange={handleChange}
                              name={`unit[${index}].averageArea`}
                              value={values.unit[index].averageArea}
                              aria-describedby="averageArea"
                              placeholder="Digite a area"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.1} minWidth={175}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <Tooltip title={'Área Privativa total'}>
                              <S.Label>A. P. Total</S.Label>
                            </Tooltip>

                            <Input
                              disabled
                              placeholder="0"
                              onBlur={(e) => {
                                setFieldValue(
                                  `unit[${index}].areaPrivativaTotal`,
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'mult',
                                  value1: e.target.value,
                                  value2: unit.areaExchanged.toString(),
                                  value3: unit.marketAmount.toString(),
                                  fieldName: 'netAmount',
                                  setFieldValue
                                });
                              }}
                              onChange={handleChange}
                              id={`areaPrivativaTotal-${unit.id}`}
                              aria-describedby="areaPrivativaTotal"
                              name={`unit[${index}].areaPrivativaTotal`}
                              value={values.unit[index].areaPrivativaTotal}
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.2} minWidth={190}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <Tooltip title={'Quantidades de permutas'}>
                              <S.Label>Qtd. Permutas (m²)</S.Label>
                            </Tooltip>

                            <Input
                              required
                              onBlur={(e) => {
                                setFieldValue(
                                  `unit[${index}].exchangeQuantity`,
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'sum',
                                  value1: unit.averageArea.toString(),
                                  value2: e.target.value,
                                  fieldName: 'areaExchanged',
                                  setFieldValue
                                });
                              }}
                              onChange={handleChange}
                              id={`exchangeQuantity-${unit.id}`}
                              name={`unit[${index}].exchangeQuantity`}
                              value={values.unit[index].exchangeQuantity}
                              placeholder="Digite a quantidade"
                              aria-describedby="exchangeQuantity"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.6} minWidth={250}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label> Área permutada (m²)</S.Label>
                            <Input
                              required
                              disabled
                              onBlur={handleBlur}
                              id={`areaExchanged-${unit.id}`}
                              onChange={handleChange}
                              name={`unit[${index}].areaExchanged`}
                              value={values.unit[index].areaExchanged}
                              placeholder="Digite a area"
                              aria-describedby="areaExchanged"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={1.5} minWidth={220}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Valor de venda/m² (R$)</S.Label>

                            <Input
                              required
                              onBlur={(e) => {
                                setFieldValue(
                                  `unit[${index}].marketAmount`,
                                  e.target.value
                                );
                                handleSumValues({
                                  id: unit.id,
                                  type: 'mult',
                                  value1: unit.areaPrivativaTotal.toString(),
                                  value2: unit.areaExchanged.toString(),
                                  value3: e.target.value,
                                  fieldName: 'netAmount',
                                  setFieldValue
                                });
                              }}
                              id={`marketAmount-${unit.id}`}
                              onChange={handleChange}
                              name={`unit[${index}].marketAmount`}
                              value={formatCurrency(
                                values.unit[index].marketAmount || ''
                              )}
                              placeholder="Digite o valor"
                              aria-describedby="marketAmount"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={1.9} minWidth={280}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <Tooltip title={'VGV líquido da permuta'}>
                              <S.Label>VGV Liq. Permuta (R$)</S.Label>
                            </Tooltip>
                            <Input
                              required
                              disabled
                              onBlur={handleBlur}
                              id={`netAmount-${unit.id}`}
                              onChange={handleChange}
                              placeholder="0,00"
                              aria-describedby="netAmount"
                              name={`unit[${index}].netAmount`}
                              value={formatCurrency(
                                values.unit[index].netAmount.toString() || ''
                              )}
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={1}
                          className="containerButton"
                          minWidth={values.unit.length > 1 ? 80 : 45}
                        >
                          {values.unit.length > 1 && (
                            <Button
                              size="30px"
                              className="btnRemove"
                              onClick={() => remove(unit.id)}
                            >
                              -
                            </Button>
                          )}
                          <Button
                            size="30px"
                            onClick={() =>
                              push({
                                ...unitDefault,
                                id: values.unit.length
                              })
                            }
                          >
                            +
                          </Button>
                        </Grid>
                      </S.ContainerInputs>
                    ))}
                  </Grid>
                );
              }}
            </FieldArray>

            <Grid
              container
              spacing={{ xs: 0, sm: 2 }}
              rowGap={1}
              pl={0.3}
              pt={4}
              pb={2.5}
            >
              <Grid item xs={12} sm={6} md={1.5} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Pavimentos </S.Label>
                  <Input
                    required
                    id="flooring"
                    onBlur={(e) => {
                      setFieldValue(`flooring`, e.target.value);
                      handleSumValues({
                        id: '',
                        type: 'sumLand',
                        value1: e.target.value,
                        value2: values.unitPerFloor,
                        fieldName: 'totalUnitsInDevelopment',
                        setFieldValue
                      });
                    }}
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
                  <Tooltip title={'Unidades por andar'}>
                    <S.Label>Uni. / Andar</S.Label>
                  </Tooltip>
                  <Input
                    required
                    id="unitPerFloor"
                    onBlur={(e) => {
                      setFieldValue(`unitPerFloor`, e.target.value);
                      handleSumValues({
                        id: '',
                        type: 'sumLand',
                        value1: values.flooring,
                        value2: e.target.value,
                        fieldName: 'totalUnitsInDevelopment',
                        setFieldValue
                      });
                    }}
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
                    required
                    onBlur={handleBlur}
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
                  <Tooltip title={'Unidades Total no empreendimento'}>
                    <S.Label>Uni. T. no Empreendimento </S.Label>
                  </Tooltip>
                  <Input
                    disabled
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="totalUnitsInDevelopment"
                    placeholder="Digite a quantidade"
                    value={values.totalUnitsInDevelopment || ''}
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
                  <Tooltip title={'Total de área privativa'}>
                    <S.Label>T. A. Privativa (m²)</S.Label>
                  </Tooltip>
                  <Input
                    required
                    disabled
                    placeholder="0"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="totalPrivateAreaQuantity"
                    value={values.totalPrivateAreaQuantity || ''}
                    aria-describedby="totalPrivateAreaQuantity"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={1.5} minWidth={295}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <Tooltip title={'Área total a construída (m²)'}>
                    <S.Label>A. T. Construída (m²)</S.Label>
                  </Tooltip>
                  <Input
                    required
                    onBlur={handleBlur}
                    id="totalToBeBuiltArea"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
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
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2} minWidth={200}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Área total do empreendimento</S.Label>
                  <Input
                    required
                    onBlur={handleBlur}
                    id="totalAreaOfTheDevelopment"
                    onChange={handleChange}
                    value={values.totalAreaOfTheDevelopment}
                    aria-describedby="totalAreaOfTheDevelopment"
                    placeholder="Digite o quantidade"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={
                      touched.totalAreaOfTheDevelopment &&
                      errors.totalAreaOfTheDevelopment
                    }
                    error={
                      touched.totalAreaOfTheDevelopment &&
                      Boolean(errors.totalAreaOfTheDevelopment)
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2} minWidth={340}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Área Total Permutada</S.Label>

                  <Input
                    required
                    disabled
                    placeholder="0,00"
                    onBlur={handleBlur}
                    id=" totalExchangeArea"
                    onChange={handleChange}
                    aria-describedby=" totalExchangeArea"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatterV2.format(
                      parseFloat(values.totalExchangeArea) || 0
                    )}
                    helperText={
                      touched.totalExchangeArea && errors.totalExchangeArea
                    }
                    error={
                      touched.totalExchangeArea &&
                      Boolean(errors.totalExchangeArea)
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2} minWidth={340}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <Tooltip title={'Área total privativa sem permuta (m²)'}>
                    <S.Label>A. T. P. Permuta (m²) </S.Label>
                  </Tooltip>
                  <Input
                    required
                    disabled
                    placeholder="0"
                    onBlur={handleBlur}
                    id="totalValueNoExchange"
                    onChange={handleChange}
                    value={values.totalValueNoExchange || ''}
                    aria-describedby="totalValueNoExchange"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={
                      touched.totalValueNoExchange &&
                      errors.totalValueNoExchange
                    }
                    error={
                      touched.totalValueNoExchange &&
                      Boolean(errors.totalValueNoExchange)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.72} minWidth={280}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <Tooltip title={'Valor médio de venda (m²/R$)'}>
                    <S.Label>V. M. Venda (m²/R$) </S.Label>
                  </Tooltip>

                  <Input
                    required
                    disabled
                    placeholder="0,00"
                    onBlur={handleBlur}
                    id="averageSaleValue"
                    onChange={handleChange}
                    aria-describedby="averageSaleValue"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatCurrency(
                      values.averageSaleValue.toString() || ''
                    )}
                    helperText={
                      touched.averageSaleValue && errors.averageSaleValue
                    }
                    error={
                      touched.averageSaleValue &&
                      Boolean(errors.averageSaleValue)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.72} minWidth={280}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>
                    Área total privativa líquida de permuta (m²){' '}
                  </S.Label>

                  <Input
                    required
                    disabled
                    placeholder="0,00"
                    onBlur={handleBlur}
                    id="totalPrivateAreaNetOfExchange"
                    onChange={handleChange}
                    aria-describedby="totalPrivateAreaNetOfExchange"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatterV2.format(
                      parseFloat(values.totalPrivateAreaNetOfExchange) || 0
                    )}
                    helperText={
                      touched.totalPrivateAreaNetOfExchange &&
                      errors.totalPrivateAreaNetOfExchange
                    }
                    error={
                      touched.totalPrivateAreaNetOfExchange &&
                      Boolean(errors.totalPrivateAreaNetOfExchange)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </S.ContainerInputs>
          <S.ContainerButtons>
            <Button $isOutline size="80px" onClick={() => handleStep(1)}>
              Voltar
            </Button>
            <Button size="100px" type="submit">
              Proximo
            </Button>
          </S.ContainerButtons>
        </S.Form>
      </FormikProvider>
    </S.UnitsFormContainer>
  );
};

export { UnitsForm };
