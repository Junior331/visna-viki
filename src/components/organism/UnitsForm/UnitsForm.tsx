/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Props } from './@types';
import { Button, Input } from '@/components/elements';
import { formatCurrency, typeMask } from '@/utils/utils';
import { MaskType, emptyUnitSummary, unitSummaryType } from '@/utils/types';
import { calculateTUID, handleChangeUnit, handleSumValues } from './utils';
import unitsFormSchema from './UnitsFormSchema';
import * as S from './UnitsFormStyled';

const UnitsForm = ({ date, setDate, handleStep }: Props) => {
  const [listUnit, setListUnit] = useState<Array<unitSummaryType>>([
    emptyUnitSummary
  ]);
  const formik = useFormik({
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
      const payload = {
        projectId: 0,
        unit: listUnit,
        flooring: values.flooring,
        underground: values.underground,
        unitPerFloor: values.unitPerFloor,
        averageSaleValue: values.averageSaleValue,
        totalToBeBuiltArea: values.totalToBeBuiltArea,
        totalValueNoExchange: values.totalValueNoExchange,
        totalUnitsInDevelopment: values.totalUnitsInDevelopment
      };

      setDate({
        ...date,
        units: {
          ...payload
        }
      });

      handleStep(3);
    },
    validationSchema: unitsFormSchema
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    handleSubmit,
    handleChange
  } = formik;
  const emptyVgv =
    values.marketAmount && values.marketAmount && values.marketAmount;

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
    if (!values.unitQuantity) {
      const result = calculateTUID(listUnit, 'marketAmount');
      if (result) {
        setFieldValue('averageSaleValue', result / listUnit.length); // Valor médio de venda (m²)
      }
    }
  }, [listUnit, setFieldValue, values.unitQuantity]);

  useEffect(() => {
    if (date.units.flooring) {
      const units: any = date.units;
      units.unit.forEach((unit: any, index: number) => {
        Object.keys(unit).forEach((unitKey: string) => {
          // Construa a chave do campo do formulário usando o índice e a chave do campo na unidade
          const fieldName = `unit.${index}.${unitKey}`;
          // Defina o valor do campo no formulário
          setFieldValue(fieldName, unit[unitKey]);
        });
      });

      Object.keys(units).forEach((key: string) => {
        setFieldValue(key, units[key]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setFieldValue]);

  useEffect(() => {
    const result = calculateTUID(listUnit, 'areaPrivativaTotal');
    if (result) {
      setFieldValue('totalPrivateAreaQuantity', result); // Total de area privativa
    }
  }, [listUnit, setFieldValue]);

  useEffect(() => {
    const result = calculateTUID(listUnit, 'unitQuantity');
    if (result) {
      setFieldValue('totalUnitsInDevelopment', result); // Total de area privativa
    }
  }, [listUnit, setFieldValue]);

  useEffect(() => {
    const sumAreaPrivativaTotal = calculateTUID(listUnit, 'areaPrivativaTotal');
    const sumTotalExchangeArea = calculateTUID(listUnit, 'totalExchangeArea');
    const result = sumAreaPrivativaTotal - sumTotalExchangeArea;
    if (result) {
      setFieldValue('totalValueNoExchange', result); // Total de area privativa
    }
  }, [listUnit, setFieldValue]);

  useEffect(() => {
    const sumNetAmount = calculateTUID(listUnit, 'netAmount');
    const sumUnitQuantity = calculateTUID(listUnit, 'unitQuantity');
    const sumExchangeQuantity = calculateTUID(listUnit, 'exchangeQuantity');
    const result = sumNetAmount / (sumUnitQuantity - sumExchangeQuantity);

    if (result) {
      setFieldValue('averageSaleValue', result);
    }
  }, [listUnit, setFieldValue]);

  return (
    <S.UnitsFormContainer>
      <S.Form onSubmit={handleSubmit}>
        <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
          <Grid
            pl={4}
            mb={2}
            pt={2.5}
            container
            rowGap={4}
            spacing={{ xs: 0, sm: 2 }}
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
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Quantidade</S.Label>
                    <Input
                      required
                      onBlur={(e) => {
                        setFieldValue('unitQuantity', e.target.value);
                        handleSumValues({
                          id: unit.id,
                          type: 'sum',
                          value1: e.target.value,
                          value2: unit.averageArea,
                          fieldName: 'areaPrivativaTotal',
                          setListUnit
                        });
                        handleSumValues({
                          id: unit.id,
                          type: 'mult',
                          value1: unit.marketAmount,
                          value2: e.target.value,
                          value3: unit.exchangeQuantity,
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
                      value={typeMask(MaskType.NUMBER, unit.unitQuantity)}
                      aria-describedby="unitQuantity"
                      placeholder="Digite a quantidade"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                      helperText={touched.unitQuantity && errors.unitQuantity}
                      error={
                        touched.unitQuantity && Boolean(errors.unitQuantity)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={1} minWidth={180}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Area média</S.Label>
                    <Input
                      required
                      onBlur={(e) => {
                        setFieldValue('unitQuantity', e.target.value);
                        handleSumValues({
                          id: unit.id,
                          type: 'sum',
                          value1: e.target.value,
                          value2: unit.unitQuantity,
                          fieldName: 'areaPrivativaTotal',
                          setListUnit
                        });
                        handleSumValues({
                          id: unit.id,
                          type: 'sum',
                          value1: e.target.value,
                          value2: unit.exchangeQuantity,
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
                      helperText={touched.averageArea && errors.averageArea}
                      error={touched.averageArea && Boolean(errors.averageArea)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={1.3} minWidth={165}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                      placeholder="0"
                      value={unit.areaPrivativaTotal}
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
                <Grid item xs={12} sm={6} md={1.5} minWidth={180}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <S.Label>Qtd permutas</S.Label>
                    <Input
                      required
                      onBlur={(e) => {
                        setFieldValue('exchangeQuantity', e.target.value);
                        handleSumValues({
                          id: unit.id,
                          type: 'sum',
                          value1: unit.averageArea,
                          value2: e.target.value,
                          fieldName: 'totalExchangeArea',
                          setListUnit
                        });
                        handleSumValues({
                          id: unit.id,
                          type: 'mult',
                          value1: unit.marketAmount,
                          value2: unit.unitQuantity,
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
                      helperText={
                        touched.exchangeQuantity && errors.exchangeQuantity
                      }
                      error={
                        touched.exchangeQuantity &&
                        Boolean(errors.exchangeQuantity)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={1.5} minWidth={265}>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                      placeholder="0"
                      value={unit.totalExchangeArea}
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
                      required
                      onBlur={(e) => {
                        setFieldValue('marketAmount', e.target.value);
                        handleSumValues({
                          id: unit.id,
                          type: 'mult',
                          value1: e.target.value,
                          value2: unit.unitQuantity,
                          value3: unit.exchangeQuantity,
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
                      helperText={touched.marketAmount && errors.marketAmount}
                      error={
                        touched.marketAmount && Boolean(errors.marketAmount)
                      }
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
                      placeholder="0,00"
                      aria-describedby="netAmount"
                      value={
                        emptyVgv
                          ? formatCurrency(unit.netAmount.toString())
                          : ''
                      }
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
                <Grid item xs={12} sm={6} md={0.5} className="containerButton">
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
            pt={4}
            pb={2.5}
          >
            <Grid item xs={12} sm={6} md={1.5} minWidth={200}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Pavimentos </S.Label>
                <Input
                  required
                  onBlur={handleBlur}
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
                  required
                  onBlur={handleBlur}
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
                <S.Label>U. Total no empreendimento </S.Label>
                <Input
                  required
                  disabled
                  onBlur={handleBlur}
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
                  required
                  disabled
                  placeholder="0"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="totalPrivateAreaQuantity"
                  value={values.totalPrivateAreaQuantity}
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

            <Grid item xs={12} sm={6} md={1.5} minWidth={295}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Área total a construir (m²) </S.Label>
                <Input
                  required
                  onBlur={handleBlur}
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

            <Grid item xs={12} sm={6} md={2} minWidth={340}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <S.Label>Área total privativa sem permuta (m²) </S.Label>
                <Input
                  required
                  disabled
                  placeholder="0"
                  onBlur={handleBlur}
                  id="totalValueNoExchange"
                  onChange={handleChange}
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
                  required
                  disabled
                  placeholder="0,00"
                  onBlur={handleBlur}
                  id="averageSaleValue"
                  onChange={handleChange}
                  aria-describedby="averageSaleValue"
                  inputProps={{ style: { fontSize: '1.4rem' } }}
                  value={formatCurrency(values.averageSaleValue.toString())}
                  helperText={
                    touched.averageSaleValue && errors.averageSaleValue
                  }
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
        </S.ContainerInputs>
        <S.ContainerButtons>
          <Button isOutline size="80px" onClick={() => handleStep(1)}>
            Voltar
          </Button>
          <Button size="100px" type="submit">
            Proximo
          </Button>
        </S.ContainerButtons>
      </S.Form>
    </S.UnitsFormContainer>
  );
};

export { UnitsForm };
