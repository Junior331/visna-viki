/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Grid, FormControl } from '@mui/material';

import { Props } from './@types';
import unitsFormSchema from './UnitsFormSchema';
import { Button, Input } from '@/components/elements';
import { Tooltip } from '@/components/elements/Tooltip';
import { handleSumValues } from './utils';
import { formatterV2, handleKeyDown, formatCurrency } from '@/utils/utils';

import * as S from './UnitsFormStyled';

const UnitsForm = memo(({ date, handleStep, listCharacteristics }: Props) => {
  const formik = useFormik({
    initialValues: date.units,
    onSubmit: async () => {},
    validationSchema: unitsFormSchema
  });

  useEffect(() => {
    console.log('Componente UnitsForm atualizado');
  }, []);
  console.log('listCharacteristics ::', listCharacteristics);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <S.UnitsFormContainer>
      <FormikProvider value={formik}>
        <S.Form onSubmit={formik.handleSubmit}>
          <S.ContainerInputs
            container
            className="bgWhite"
            spacing={{ xs: 0, sm: 2 }}
          >
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
                      formik.touched.flooring && Boolean(formik.errors.flooring)
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
                      formik.touched.unitPerFloor && formik.errors.unitPerFloor
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
                  <Tooltip title={'Unidades Total no empreendimento'}>
                    <S.Label>Uni. T. no Empreendimento </S.Label>
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
                  <Tooltip title={'Total de área privativa'}>
                    <S.Label>T. A. Privativa (m²)</S.Label>
                  </Tooltip>
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

              <Grid item xs={12} sm={6} md={1.5} minWidth={295}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <Tooltip title={'Área total a construída (m²)'}>
                    <S.Label>A. T. Construída (m²)</S.Label>
                  </Tooltip>
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
                  <S.Label>Área total do empreendimento</S.Label>
                  <Input
                    required
                    onBlur={formik.handleBlur}
                    id="totalAreaOfTheDevelopment"
                    onChange={formik.handleChange}
                    value={formik.values.totalAreaOfTheDevelopment}
                    aria-describedby="totalAreaOfTheDevelopment"
                    placeholder="Digite o quantidade"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    helperText={
                      formik.touched.totalAreaOfTheDevelopment &&
                      formik.errors.totalAreaOfTheDevelopment
                    }
                    error={
                      formik.touched.totalAreaOfTheDevelopment &&
                      Boolean(formik.errors.totalAreaOfTheDevelopment)
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
                    <S.Label>A. T. P. Permuta (m²) </S.Label>
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
                  <Tooltip title={'Valor médio de venda (m²/R$)'}>
                    <S.Label>V. M. Venda (m²/R$) </S.Label>
                  </Tooltip>

                  <Input
                    required
                    disabled
                    placeholder="0,00"
                    id="averageSaleValue"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    aria-describedby="averageSaleValue"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatCurrency(
                      formik.values.averageSaleValue.toString() || ''
                    )}
                    helperText={
                      formik.touched.averageSaleValue &&
                      formik.errors.averageSaleValue
                    }
                    error={
                      formik.touched.averageSaleValue &&
                      Boolean(formik.errors.averageSaleValue)
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
                    onBlur={formik.handleBlur}
                    id="totalPrivateAreaNetOfExchange"
                    onChange={formik.handleChange}
                    aria-describedby="totalPrivateAreaNetOfExchange"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatterV2.format(
                      parseFloat(formik.values.totalPrivateAreaNetOfExchange) ||
                        0
                    )}
                    helperText={
                      formik.touched.totalPrivateAreaNetOfExchange &&
                      formik.errors.totalPrivateAreaNetOfExchange
                    }
                    error={
                      formik.touched.totalPrivateAreaNetOfExchange &&
                      Boolean(formik.errors.totalPrivateAreaNetOfExchange)
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
});

export { UnitsForm };
