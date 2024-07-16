/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { Grid, FormControl, Select, MenuItem } from '@mui/material';

import { Props } from './@types';
import unitsFormSchema from './UnitsFormSchema';
import { Button, Input } from '@/components/elements';
import { Tooltip } from '@/components/elements/Tooltip';
import { StepsIsDoneContext } from '@/contexts/StepIsDone';
import { calculateTUID, handleSumValues, unitDefault } from './utils';
import {
  formatterV2,
  handleKeyDown,
  formatCurrency,
  typeMask
} from '@/utils/utils';
import { MaskType } from '@/utils/types';
import * as S from './UnitsFormStyled';

const UnitsForm = memo(
  ({ date, handleStep, setDate, listCharacteristics }: Props) => {
    const [VGVTotal, setVGVTotal] = useState(0);
    const [projectEfficiency, setProjectEfficiency] = useState(0);
    const { stepsIsDone, setStepsIsDone } = useContext(StepsIsDoneContext);

    const formik = useFormik({
      initialValues: date.units,
      onSubmit: async (values) => {
        setDate({
          ...date,
          units: {
            ...values,
            unit: values.unit.map((unit) => ({
              ...unit
            }))
          }
        });
        setStepsIsDone([...stepsIsDone, '2']);

        handleStep(3);
      },
      validationSchema: unitsFormSchema
    });

    useEffect(() => {
      if (date.units.flooring) {
        const units: any = date.units;
        units.unit.forEach((unit: any, index: number) => {
          Object.keys(unit).forEach((unitKey: string) => {
            const fieldName = `unit.${index}.${unitKey}`;
            formik.setFieldValue(fieldName, unit[unitKey]);
          });
        });

        Object.keys(units).forEach((key: string) => {
          formik.setFieldValue(key, units[key]);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const totalPrivateAreaQuantity = calculateTUID(
        formik.values.unit,
        'areaPrivativaTotal'
      );
      const totalExchangeArea = calculateTUID(
        formik.values.unit,
        'areaExchanged'
      );
      const totalExchanges = calculateTUID(
        formik.values.unit,
        'exchangeQuantity'
      );
      const totalVGVTotal = calculateTUID(formik.values.unit, 'netAmount');

      if (totalExchanges) {
        formik.setFieldValue('TotalExchanges', totalExchanges);
      }

      const totalPrivateAreaNetOfExchange =
        parseFloat(formik.values.totalAreaOfTheDevelopment) - totalExchangeArea;

      if (totalPrivateAreaNetOfExchange !== null) {
        formik.setFieldValue(
          'totalPrivateAreaNetOfExchange',
          totalPrivateAreaNetOfExchange
        );
      }
      if (totalPrivateAreaQuantity !== null) {
        formik.setFieldValue(
          'totalPrivateAreaQuantity',
          totalPrivateAreaQuantity
        );
      }
      if (totalExchangeArea) {
        formik.setFieldValue('totalExchangeArea', totalExchangeArea);
      }

      if (totalPrivateAreaQuantity !== null && totalExchangeArea !== null) {
        const totalValueNoExchange =
          totalPrivateAreaQuantity - totalExchangeArea;
        formik.setFieldValue('totalValueNoExchange', totalValueNoExchange);
      }

      if (totalVGVTotal) {
        setVGVTotal(totalVGVTotal);
      }

      if (totalPrivateAreaQuantity !== null && totalExchangeArea !== null) {
        const totalValueNoExchange =
          totalPrivateAreaQuantity - totalExchangeArea;
        formik.setFieldValue('totalValueNoExchange', totalValueNoExchange);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.unit, formik.values.totalAreaOfTheDevelopment]);

    useEffect(() => {
      setDate({
        ...date,
        units: {
          ...formik.values
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values]);

    useEffect(() => {
      if (VGVTotal && formik.values.totalValueNoExchange) {
        const sum = VGVTotal / parseFloat(formik.values.totalValueNoExchange);
        formik.setFieldValue('averageSaleValue', sum.toFixed() || 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VGVTotal, formik.values.totalValueNoExchange]);

    useEffect(() => {
      if (
        formik.values.totalToBeBuiltArea &&
        formik.values.totalPrivateAreaQuantity
      ) {
        const sum1 = parseFloat(
          formik.values.totalPrivateAreaQuantity ||
            '0'.replace(/\./g, '').replace(',', '.')
        );
        const sum2 = parseFloat(
          formik.values.totalToBeBuiltArea.replace(/\./g, '').replace(',', '.')
        );

        const sum = (sum1 / sum2 - 1) * 100;
        sum.toFixed();
        setProjectEfficiency(sum > 0 ? sum : 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      formik.values.totalToBeBuiltArea,
      formik.values.totalPrivateAreaQuantity
    ]);

    const visibleTodos = useMemo(
      () => listCharacteristics,
      [listCharacteristics]
    );

    if (!visibleTodos.length) {
      return null;
    }

    return (
      <S.UnitsFormContainer>
        <FormikProvider value={formik}>
          <S.Form onSubmit={formik.handleSubmit}>
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
                      {formik.values.unit.map((unit, index) => (
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
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `unit[${index}].unitTypeId`,
                                    e.target.value
                                  );
                                  formik.setFieldValue(
                                    `unit[${index}].unitCharacteristicsId`,
                                    ''
                                  );
                                  formik.handleChange(e);
                                }}
                                className="SelectComponent"
                                id={`unitTypeId-${unit.id}`}
                                name={`unit[${index}].unitTypeId`}
                                value={formik.values.unit[index].unitTypeId}
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
                          {Boolean(formik.values.unit[index].unitTypeId) && (
                            <Grid item xs={12} sm={6} md={1.5} minWidth={170}>
                              <FormControl
                                sx={{ m: 1, width: '25ch' }}
                                variant="outlined"
                              >
                                <S.Label>Características</S.Label>

                                <Select
                                  disabled={
                                    !listCharacteristics[
                                      formik.values.unit[index].unitTypeId - 1
                                    ].children.length
                                  }
                                  displayEmpty
                                  onBlur={formik.handleBlur}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      `unit[${index}].unitCharacteristicsId`,
                                      e.target.value
                                    );
                                    formik.handleChange(e);
                                  }}
                                  className="SelectComponent"
                                  name={`unit[${index}].unitCharacteristicsId`}
                                  value={
                                    formik.values.unit[index]
                                      .unitCharacteristicsId
                                  }
                                  IconComponent={KeyboardArrowDownRounded}
                                  inputProps={{
                                    'aria-label': 'Without label'
                                  }}
                                >
                                  <MenuItem value={''} disabled>
                                    <em>Selecione a opção </em>
                                  </MenuItem>
                                  {listCharacteristics[
                                    formik.values.unit[index].unitTypeId - 1
                                  ].children.map((item) => (
                                    <MenuItem value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
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
                                  formik.setFieldValue(
                                    `unit[${index}].unitQuantity`,
                                    e.target.value
                                  );
                                  handleSumValues({
                                    id: unit.id,
                                    type: 'sum',
                                    value1: e.target.value,
                                    value2: unit.averageArea,
                                    fieldName: 'areaPrivativaTotal',
                                    setFieldValue: formik.setFieldValue
                                  });
                                }}
                                id={`unitQuantity-${unit.id}`}
                                onChange={formik.handleChange}
                                name={`unit[${index}].unitQuantity`}
                                value={typeMask(
                                  MaskType.NUMBER,
                                  formik.values.unit[index].unitQuantity
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
                                  formik.setFieldValue(
                                    `unit[${index}].averageArea`,
                                    e.target.value
                                  );
                                  handleSumValues({
                                    id: unit.id,
                                    type: 'sum',
                                    value1: e.target.value,
                                    value2: unit.unitQuantity.toString(),
                                    fieldName: 'areaPrivativaTotal',
                                    setFieldValue: formik.setFieldValue
                                  });
                                  handleSumValues({
                                    id: unit.id,
                                    type: 'sum',
                                    value1: e.target.value,
                                    value2: unit.exchangeQuantity.toString(),
                                    fieldName: 'areaExchanged',
                                    setFieldValue: formik.setFieldValue
                                  });

                                  handleSumValues({
                                    id: unit.id,
                                    type: 'mult',
                                    value1: unit.areaPrivativaTotal.toString(),
                                    value2: e.target.value,
                                    value3: unit.marketAmount.toString(),
                                    fieldName: 'netAmount',
                                    setFieldValue: formik.setFieldValue
                                  });
                                }}
                                id={`averageArea-${unit.id}`}
                                onChange={formik.handleChange}
                                name={`unit[${index}].averageArea`}
                                value={formik.values.unit[index].averageArea}
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
                                  formik.setFieldValue(
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
                                    setFieldValue: formik.setFieldValue
                                  });
                                }}
                                onChange={formik.handleChange}
                                id={`areaPrivativaTotal-${unit.id}`}
                                aria-describedby="areaPrivativaTotal"
                                name={`unit[${index}].areaPrivativaTotal`}
                                value={
                                  formik.values.unit[index].areaPrivativaTotal
                                }
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
                                  formik.setFieldValue(
                                    `unit[${index}].exchangeQuantity`,
                                    e.target.value
                                  );
                                  handleSumValues({
                                    id: unit.id,
                                    type: 'sum',
                                    value1: unit.averageArea.toString(),
                                    value2: e.target.value,
                                    fieldName: 'areaExchanged',
                                    setFieldValue: formik.setFieldValue
                                  });
                                }}
                                onChange={formik.handleChange}
                                id={`exchangeQuantity-${unit.id}`}
                                name={`unit[${index}].exchangeQuantity`}
                                value={
                                  formik.values.unit[index].exchangeQuantity
                                }
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
                                onBlur={formik.handleBlur}
                                id={`areaExchanged-${unit.id}`}
                                onChange={formik.handleChange}
                                name={`unit[${index}].areaExchanged`}
                                value={formik.values.unit[index].areaExchanged}
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
                                  formik.setFieldValue(
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
                                    setFieldValue: formik.setFieldValue
                                  });
                                }}
                                id={`marketAmount-${unit.id}`}
                                onChange={formik.handleChange}
                                name={`unit[${index}].marketAmount`}
                                value={formatCurrency(
                                  formik.values.unit[index].marketAmount || ''
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
                                onBlur={formik.handleBlur}
                                id={`netAmount-${unit.id}`}
                                onChange={formik.handleChange}
                                placeholder="0,00"
                                aria-describedby="netAmount"
                                name={`unit[${index}].netAmount`}
                                value={formatCurrency(
                                  formik.values.unit[
                                    index
                                  ].netAmount.toString() || ''
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
                            minWidth={formik.values.unit.length > 1 ? 80 : 45}
                          >
                            {formik.values.unit.length > 1 && (
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
                                  id: formik.values.unit.length
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
                        handleSumValues({
                          id: '',
                          type: 'sumLand',
                          value1: e.target.value,
                          value2: formik.values.unitPerFloor,
                          fieldName: 'totalUnitsInDevelopment',
                          setFieldValue: formik.setFieldValue
                        });
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.flooring}
                      aria-describedby="flooring"
                      placeholder="Digite a quantidade"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      helperText={
                        formik.touched.flooring && formik.errors.flooring
                      }
                      error={
                        formik.touched.flooring &&
                        Boolean(formik.errors.flooring)
                      }
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
                        formik.setFieldValue(`unitPerFloor`, e.target.value);
                        handleSumValues({
                          id: '',
                          type: 'sumLand',
                          value1: formik.values.flooring,
                          value2: e.target.value,
                          fieldName: 'totalUnitsInDevelopment',
                          setFieldValue: formik.setFieldValue
                        });
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.unitPerFloor}
                      aria-describedby="unitPerFloor"
                      placeholder="Digite a quantidade"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      helperText={
                        formik.touched.unitPerFloor &&
                        formik.errors.unitPerFloor
                      }
                      error={
                        formik.touched.unitPerFloor &&
                        Boolean(formik.errors.unitPerFloor)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2} minWidth={200}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Subsolos</S.Label>
                    <Input
                      required
                      onBlur={formik.handleBlur}
                      id="underground"
                      onChange={formik.handleChange}
                      value={formik.values.underground}
                      aria-describedby="underground"
                      placeholder="Digite o quantidade"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      helperText={
                        formik.touched.underground && formik.errors.underground
                      }
                      error={
                        formik.touched.underground &&
                        Boolean(formik.errors.underground)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} minWidth={280}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <Tooltip title={'Total de Unidades no empreendimento'}>
                      <S.Label>Total de uni. no emp.</S.Label>
                    </Tooltip>
                    <Input
                      disabled
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      id="totalUnitsInDevelopment"
                      placeholder="Digite a quantidade"
                      value={formik.values.totalUnitsInDevelopment || ''}
                      aria-describedby="totalUnitsInDevelopment"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      helperText={
                        formik.touched.totalUnitsInDevelopment &&
                        formik.errors.totalUnitsInDevelopment
                      }
                      error={
                        formik.touched.totalUnitsInDevelopment &&
                        Boolean(formik.errors.totalUnitsInDevelopment)
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2} minWidth={200}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Total de permutas</S.Label>
                    <Input
                      required
                      disabled
                      placeholder="0"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      id="TotalExchanges"
                      value={formik.values.TotalExchanges}
                      aria-describedby="TotalExchanges"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={1.5} minWidth={295}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Área total a construir </S.Label>
                    <Input
                      required
                      onBlur={formik.handleBlur}
                      id="totalToBeBuiltArea"
                      onChange={formik.handleChange}
                      onKeyDown={handleKeyDown}
                      value={formik.values.totalToBeBuiltArea}
                      aria-describedby="totalToBeBuiltArea"
                      placeholder="Digite a quantidade"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      helperText={
                        formik.touched.totalToBeBuiltArea &&
                        formik.errors.totalToBeBuiltArea
                      }
                      error={
                        formik.touched.totalToBeBuiltArea &&
                        Boolean(formik.errors.totalToBeBuiltArea)
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2} minWidth={200}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Área total privativa</S.Label>
                    <Input
                      required
                      disabled
                      placeholder="0"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      id="totalPrivateAreaQuantity"
                      value={formik.values.totalPrivateAreaQuantity || ''}
                      aria-describedby="totalPrivateAreaQuantity"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2} minWidth={340}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Área total de permutas</S.Label>

                    <Input
                      required
                      disabled
                      placeholder="0,00"
                      onBlur={formik.handleBlur}
                      id=" totalExchangeArea"
                      onChange={formik.handleChange}
                      aria-describedby=" totalExchangeArea"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      value={formatterV2.format(
                        parseFloat(formik.values.totalExchangeArea) || 0
                      )}
                      helperText={
                        formik.touched.totalExchangeArea &&
                        formik.errors.totalExchangeArea
                      }
                      error={
                        formik.touched.totalExchangeArea &&
                        Boolean(formik.errors.totalExchangeArea)
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2} minWidth={340}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <Tooltip title={'Área total privativa sem permuta (m²)'}>
                      <S.Label>Área total pri. S/permuta </S.Label>
                    </Tooltip>
                    <Input
                      required
                      disabled
                      placeholder="0"
                      onBlur={formik.handleBlur}
                      id="totalValueNoExchange"
                      onChange={formik.handleChange}
                      value={formik.values.totalValueNoExchange || ''}
                      aria-describedby="totalValueNoExchange"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      helperText={
                        formik.touched.totalValueNoExchange &&
                        formik.errors.totalValueNoExchange
                      }
                      error={
                        formik.touched.totalValueNoExchange &&
                        Boolean(formik.errors.totalValueNoExchange)
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2.72} minWidth={280}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>VGV Total</S.Label>
                    <Input
                      required
                      disabled
                      id="VGVTotal"
                      placeholder="0,00"
                      aria-describedby="VGVTotal"
                      value={formatterV2.format(VGVTotal)}
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2.72} minWidth={280}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <Tooltip title={'Valor médio de venda (m²/R$)'}>
                      <S.Label>V. Médio Venda (m²/R$) </S.Label>
                    </Tooltip>

                    <Input
                      disabled
                      placeholder="0,00"
                      id="averageSaleValue"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      aria-describedby="averageSaleValue"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      value={formatterV2.format(
                        parseFloat(formik.values.averageSaleValue) || 0
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2} minWidth={280}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Eficiência do projeto(%)</S.Label>

                    <Input
                      required
                      disabled
                      placeholder="0,00"
                      id="projectEfficiency"
                      aria-describedby="projectEfficiency"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      value={projectEfficiency || 0}
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
  }
);

export { UnitsForm };
