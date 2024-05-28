/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Select,
  MenuItem,
  Typography,
  FormControl
} from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import {
  calculateTUID,
  unitDefault
} from '@/components/organism/UnitsForm/utils';
import { handleSumValues as handleSumValuesV2 } from '@/components/organism/DeadlinesForm/utils';
import { tabPanelProps } from './@types';
import { getInfoProject } from './services';
import { icons } from '@/assets/images/icons';
import { Layout } from '@/components/organism';
import { emptyProjectInfo } from '@/utils/emptys';
import { GenericModal } from '@/components/modules';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import {
  breadCrumbsItems,
  handleDeleteProject,
  handleEditDeadline,
  handleEditLand,
  handleEdittUnits,
  handleSumValues,
  handleTabs
} from './utils';
import {
  convertToParams,
  formatCurrency,
  handleKeyDown,
  typeMask
} from '@/utils/utils';
import { HeaderBreadcrumbs } from '@/components/organism';
import { MaskType, projectInfoType } from '@/utils/types';
import unitsFormSchema from '@/components/organism/UnitsForm/UnitsFormSchema';
import * as S from './EditProjectStyled';
import { Tooltip } from '@/components/elements/Tooltip';

const CustomTabPanel = (props: tabPanelProps) => {
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

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

export const EditProject = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [date, setDate] = useState<projectInfoType>(emptyProjectInfo);

  const formikLand = useFormik({
    initialValues: date.land,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        projectId: parseFloat(id)
      };
      const landId = values.id;
      handleEditLand({
        landId,
        payload,
        setLoading,
        setSnackbar
      });
    }
  });

  const formikUnit = useFormik({
    initialValues: date.unitHub,
    onSubmit: async (values) => {
      const payload = {
        id: values.id,
        projectId: parseFloat(id),
        flooring: values.flooring,
        underground: values.underground,
        unitPerFloor: values.unitPerFloor,
        averageSaleValue: values.averageSaleValue,
        totalToBeBuiltArea: values.totalToBeBuiltArea,
        totalValueNoExchange: values.totalValueNoExchange,
        totalUnitsInDevelopment: values.totalUnitsInDevelopment,
        totalPrivateAreaQuantity: values.totalPrivateAreaQuantity,
        unit: values.unit
      };

      handleEdittUnits({
        unitId: values.id,
        payload,
        setLoading,
        setSnackbar
      });
    },
    validationSchema: unitsFormSchema
  });

  const formikDeadline = useFormik({
    initialValues: date.deadline,
    onSubmit: async (values) => {
      const deadlineId = values.id;
      const payload = {
        ...values,
        projectId: parseFloat(id)
      };
      handleEditDeadline({
        deadlineId,
        payload,
        setLoading,
        setSnackbar
      });
    }
  });

  const { values, touched, errors, handleBlur, handleSubmit, handleChange } =
    formikLand;

  useEffect(() => {
    getInfoProject({ id: parseFloat(id), setDate, setSnackbar });
  }, [id, setSnackbar]);

  useEffect(() => {
    const lands: any = date.land || emptyProjectInfo.land;
    Object.keys(lands)?.forEach((key: string) => {
      formikLand.setFieldValue(key, lands[key]);
    });

    if (date.unitHub) {
      const units: any = date.unitHub;
      units.unit.forEach((unit: any, index: number) => {
        Object.keys(unit).forEach((unitKey: string) => {
          const fieldName = `unit.${index}.${unitKey}`;
          formikUnit.setFieldValue(fieldName, unit[unitKey]);
        });
      });

      Object.keys(units).forEach((key: string) => {
        formikUnit.setFieldValue(key, units[key]);
      });
    }
    if (date.deadline) {
      const lands: any = date.deadline;
      Object.keys(lands)?.forEach((key: string) => {
        formikDeadline.setFieldValue(key, lands[key]);
      });
    }

    if (!date.unitHub) {
      setDate({
        ...date,
        unitHub: emptyProjectInfo.unitHub
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  useEffect(() => {
    if (!formikUnit.values.unit.length) {
      const defaultValue = [
        {
          id: 0,
          netAmount: 0,
          unitTypeId: 0,
          averageArea: 0,
          unitQuantity: 0,
          marketAmount: 0,
          exchangeQuantity: 0,
          totalExchangeArea: 0,
          areaPrivativaTotal: 0
        }
      ];
      formikUnit.setFieldValue('unit', defaultValue);
    }
  }, [formikUnit, formikUnit.values]);

  useEffect(() => {
    const listUnit = formikUnit.values.unit;
    const totalPrivateAreaQuantity = calculateTUID(
      listUnit,
      'areaPrivativaTotal'
    );

    const totalUnitsInDevelopment = calculateTUID(listUnit, 'unitQuantity');

    if (totalUnitsInDevelopment !== null) {
      formikUnit.setFieldValue(
        'totalUnitsInDevelopment',
        totalUnitsInDevelopment
      );
    }

    if (totalPrivateAreaQuantity !== null) {
      formikUnit.setFieldValue(
        'totalPrivateAreaQuantity',
        totalPrivateAreaQuantity
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikUnit.values.unit]);

  return (
    <Layout>
      <S.EditProjectContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(name)} />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
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
                <Tab
                  label="Contas"
                  onClick={() =>
                    navigate(`/bills?${convertToParams({ id, name })}`)
                  }
                />
                <Tab label="Rentabilidade" {...a11yProps(5)} disabled />
                <Tab
                  label="Aportes"
                  onClick={() =>
                    navigate(`/aportes?${convertToParams({ id, name })}`)
                  }
                />
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
                        onBlur={handleBlur}
                        id="address.street"
                        onChange={handleChange}
                        value={values.address.street}
                        placeholder="Digite o endereço"
                        aria-describedby="address.street"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="address.neighborhood"
                        placeholder="Digite o bairro"
                        value={values.address.neighborhood}
                        aria-describedby="address.neighborhood"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
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
                        name="address.country"
                        onChange={handleChange}
                        placeholder="Digite o país"
                        value={values.address.country}
                        aria-describedby="address.country"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
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
                        required
                        id="address.state"
                        onChange={handleChange}
                        value={values.address.state}
                        placeholder="Digite o estado"
                        aria-describedby="address.state"
                        inputProps={{
                          style: { fontSize: '1.4rem' },
                          maxLength: 2
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
                      <S.Label>Número</S.Label>
                      <Input
                        required
                        id="address.number"
                        onChange={handleChange}
                        placeholder="Digite o número"
                        value={values.address.number}
                        aria-describedby="address.number"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
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
                        id="address.zipCode"
                        onChange={handleChange}
                        placeholder="Digite o Cep"
                        aria-describedby="address.zipCode"
                        value={typeMask(MaskType.CEP, values.address.zipCode)}
                        inputProps={{ style: { fontSize: '1.4rem' } }}
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
                      <Tooltip title={'Área total (m²)'}>
                        <S.Label>A. total (m²)</S.Label>
                      </Tooltip>
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
                      <S.Label>Testada (m²)</S.Label>
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
                      <S.Label>Depave</S.Label>
                      <Select
                        required
                        displayEmpty
                        name="depave"
                        value={values.depave}
                        onChange={handleChange}
                        className="SelectComponent"
                        IconComponent={KeyboardArrowDownRounded}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={1}>Sim</MenuItem>
                        <MenuItem value={0}>Não</MenuItem>
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
                      <S.Label>Topografia</S.Label>

                      <Select
                        required
                        displayEmpty
                        name="topographyTypeId"
                        onChange={handleChange}
                        className="SelectComponent"
                        value={values.topographyTypeId}
                        IconComponent={KeyboardArrowDownRounded}
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
                      <S.Label>Valor (m²/R$) </S.Label>
                      <Input
                        required
                        id="amountPerMeter"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
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
                      <Tooltip title={'Valor total (R$)'}>
                        <S.Label>V. total (R$)</S.Label>
                      </Tooltip>
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
                        IconComponent={KeyboardArrowDownRounded}
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
                  <Button
                    $isOutline
                    size="80px"
                    className="btnDelete"
                    onClick={() => {
                      setIsDelete(true);
                      setOpenModal(true);
                    }}
                  >
                    Deletar
                  </Button>
                  <div>
                    <Button
                      $isOutline
                      size="80px"
                      onClick={() => setOpenModal(true)}
                    >
                      Cancelar
                    </Button>
                    <Button size="100px" type="submit">
                      Salvar
                    </Button>
                  </div>
                </S.ContainerButtons>
              </S.Form>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <FormikProvider value={formikUnit}>
                <S.Form onSubmit={formikUnit.handleSubmit}>
                  <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
                    <FieldArray name="unit">
                      {({ push, remove }) => {
                        return (
                          <Grid
                            pl={4}
                            mb={2}
                            pt={5}
                            container
                            rowGap={4}
                            className="containerUnits"
                            spacing={{ xs: 0, sm: 2 }}
                          >
                            {formikUnit.values.unit.map((unit, index) => (
                              <S.ContainerInputs
                                pl={0.5}
                                container
                                rowGap={1}
                                key={unit.id}
                                spacing={{ xs: 0, sm: 2 }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1.5}
                                  minWidth={170}
                                >
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <Tooltip title={'Tipos de unidades '}>
                                      <S.Label>T. unidades </S.Label>
                                    </Tooltip>

                                    <Select
                                      required
                                      displayEmpty
                                      onBlur={handleBlur}
                                      onChange={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].unitTypeId`,
                                          e.target.value
                                        );
                                        formikUnit.handleChange(e);
                                      }}
                                      className="SelectComponent"
                                      id={`formikUnit.unitTypeId-${unit.id}`}
                                      name={`formikUnit.unit[${index}].unitTypeId`}
                                      value={
                                        formikUnit.values.unit[index].unitTypeId
                                      }
                                      IconComponent={KeyboardArrowDownRounded}
                                      inputProps={{
                                        'aria-label': 'Without label'
                                      }}
                                    >
                                      <MenuItem value={0} disabled>
                                        <em>Selecione a opção </em>
                                      </MenuItem>
                                      <MenuItem value={1}>Residencial</MenuItem>
                                      <MenuItem value={2}>
                                        Não Residencial{' '}
                                      </MenuItem>
                                      <MenuItem value={3}>Loja</MenuItem>
                                      <MenuItem value={4}>Vagas</MenuItem>
                                      <MenuItem value={5}>HMP</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1.3}
                                  minWidth={120}
                                >
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <S.Label>Quantidade</S.Label>
                                    <Input
                                      required
                                      onBlur={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].unitQuantity`,
                                          parseFloat(e.target.value)
                                        );
                                        handleSumValues({
                                          id: unit.id,
                                          type: 'sum',
                                          value1: e.target.value,
                                          value2: unit.averageArea.toString(),
                                          fieldName: 'areaPrivativaTotal',
                                          setFieldValue:
                                            formikUnit.setFieldValue
                                        });
                                        handleSumValues({
                                          id: unit.id,
                                          type: 'mult',
                                          value1: unit.marketAmount.toString(),
                                          value2: e.target.value,
                                          value3:
                                            unit.exchangeQuantity.toString(),
                                          fieldName: 'netAmount',
                                          setFieldValue:
                                            formikUnit.setFieldValue
                                        });
                                      }}
                                      id={`unitQuantity-${unit.id}`}
                                      onChange={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].unitQuantity`,
                                          parseFloat(e.target.value)
                                        );
                                        formikUnit.handleChange(e);
                                      }}
                                      name={`unit[${index}].unitQuantity`}
                                      value={typeMask(
                                        MaskType.NUMBER,
                                        formikUnit.values.unit[
                                          index
                                        ].unitQuantity.toString()
                                      )}
                                      aria-describedby="unitQuantity"
                                      placeholder="Digite a quantidade"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={1} minWidth={165}>
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <Tooltip title={'Área média'}>
                                      <S.Label>A. média</S.Label>
                                    </Tooltip>
                                    <Input
                                      required
                                      onBlur={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].averageArea`,
                                          parseFloat(e.target.value)
                                        );
                                        handleSumValues({
                                          id: unit.id,
                                          type: 'sum',
                                          value1: e.target.value,
                                          value2: unit.unitQuantity.toString(),
                                          fieldName: 'areaPrivativaTotal',
                                          setFieldValue:
                                            formikUnit.setFieldValue
                                        });
                                        handleSumValues({
                                          id: unit.id,
                                          type: 'sum',
                                          value1: e.target.value,
                                          value2:
                                            unit.exchangeQuantity.toString(),
                                          fieldName: 'totalExchangeArea',
                                          setFieldValue:
                                            formikUnit.setFieldValue
                                        });
                                      }}
                                      id={`averageArea-${unit.id}`}
                                      onChange={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].averageArea`,
                                          parseFloat(e.target.value)
                                        );
                                        formikUnit.handleChange(e);
                                      }}
                                      name={`unit[${index}].averageArea`}
                                      value={
                                        formikUnit.values.unit[index]
                                          .averageArea
                                      }
                                      aria-describedby="averageArea"
                                      placeholder="Digite a area"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1.3}
                                  minWidth={165}
                                >
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <Tooltip title={'Área Privativa total'}>
                                      <S.Label>A. P. total</S.Label>
                                    </Tooltip>
                                    <Input
                                      disabled
                                      onBlur={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].areaPrivativaTotal`,
                                          parseFloat(e.target.value)
                                        );
                                        formikUnit.handleBlur(e);
                                      }}
                                      id={`areaPrivativaTotal-${unit.id}`}
                                      onChange={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].areaPrivativaTotal`,
                                          parseFloat(e.target.value)
                                        );
                                        formikUnit.handleChange(e);
                                      }}
                                      name={`unit[${index}].areaPrivativaTotal`}
                                      value={
                                        formikUnit.values.unit[index]
                                          .areaPrivativaTotal
                                      }
                                      placeholder="A. Privativa"
                                      aria-describedby="areaPrivativaTotal"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1.5}
                                  minWidth={180}
                                >
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <Tooltip title={'Quantidade de permutas'}>
                                      <S.Label>Q. permutas</S.Label>
                                    </Tooltip>
                                    <Input
                                      required
                                      onBlur={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].exchangeQuantity`,
                                          parseFloat(e.target.value)
                                        );
                                        handleSumValues({
                                          id: unit.id,
                                          type: 'sum',
                                          value1: unit.averageArea.toString(),
                                          value2: e.target.value,
                                          fieldName: 'totalExchangeArea',
                                          setFieldValue:
                                            formikUnit.setFieldValue
                                        });
                                        handleSumValues({
                                          id: unit.id,
                                          type: 'mult',
                                          value1: unit.marketAmount.toString(),
                                          value2: unit.unitQuantity.toString(),
                                          value3: e.target.value,
                                          fieldName: 'netAmount',
                                          setFieldValue:
                                            formikUnit.setFieldValue
                                        });
                                      }}
                                      onChange={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].exchangeQuantity`,
                                          parseFloat(e.target.value)
                                        );
                                        formikUnit.handleChange(e);
                                      }}
                                      id={`exchangeQuantity-${unit.id}`}
                                      name={`unit[${index}].exchangeQuantity`}
                                      value={
                                        formikUnit.values.unit[index]
                                          .exchangeQuantity
                                      }
                                      placeholder="Digite a quantidade"
                                      aria-describedby="exchangeQuantity"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1.5}
                                  minWidth={240}
                                >
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <Tooltip
                                      title={'Área total permutada (m²)'}
                                    >
                                      <S.Label>A. T. permutada (m²)</S.Label>
                                    </Tooltip>
                                    <Input
                                      required
                                      disabled
                                      onBlur={formikUnit.handleBlur}
                                      id={`totalExchangeArea-${unit.id}`}
                                      onChange={formikUnit.handleChange}
                                      name={`unit[${index}].totalExchangeArea`}
                                      value={
                                        formikUnit.values.unit[index]
                                          .totalExchangeArea
                                      }
                                      placeholder="Digite a area"
                                      aria-describedby="totalExchangeArea"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1.5}
                                  minWidth={160}
                                >
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <Tooltip title={'Valor de mercado (R$)'}>
                                      <S.Label>V. mercado (R$)</S.Label>
                                    </Tooltip>
                                    <Input
                                      required
                                      onBlur={(e) => {
                                        formikUnit.setFieldValue(
                                          `unit[${index}].marketAmount`,
                                          e.target.value
                                        );
                                        handleSumValues({
                                          id: unit.id,
                                          type: 'mult',
                                          value1: e.target.value,
                                          value2: unit.unitQuantity.toString(),
                                          value3:
                                            unit.exchangeQuantity.toString(),
                                          fieldName: 'netAmount',
                                          setFieldValue:
                                            formikUnit.setFieldValue
                                        });
                                      }}
                                      id={`marketAmount-${unit.id}`}
                                      onChange={(e) => {
                                        formikUnit.handleChange(e);
                                      }}
                                      name={`unit[${index}].marketAmount`}
                                      value={formatCurrency(
                                        formikUnit.values.unit[
                                          index
                                        ].marketAmount.toString()
                                      )}
                                      placeholder="Digite o valor"
                                      aria-describedby="marketAmount"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                    />
                                  </FormControl>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1.5}
                                  minWidth={160}
                                >
                                  <FormControl
                                    sx={{ m: 1, width: '25ch' }}
                                    variant="outlined"
                                  >
                                    <Tooltip title={'VGV líquido da permuta'}>
                                      <S.Label>V. L. permuta (R$)</S.Label>
                                    </Tooltip>
                                    <Input
                                      required
                                      disabled
                                      onBlur={formikUnit.handleBlur}
                                      id={`netAmount-${unit.id}`}
                                      onChange={formikUnit.handleChange}
                                      placeholder="0,00"
                                      aria-describedby="netAmount"
                                      name={`unit[${index}].netAmount`}
                                      value={formatCurrency(
                                        formikUnit.values.unit[
                                          index
                                        ].netAmount.toString()
                                      )}
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={1}
                                  className="containerButton"
                                  minWidth={
                                    formikUnit.values.unit.length > 1 ? 80 : 45
                                  }
                                >
                                  {formikUnit.values.unit.length > 1 && (
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
                                        id: formikUnit.values.unit.length
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
                            helperText={
                              formikUnit.touched.flooring &&
                              formikUnit.errors.flooring
                            }
                            error={
                              formikUnit.touched.flooring &&
                              Boolean(formikUnit.errors.flooring)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1.5} minWidth={200}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip title={'Unidades por andar'}>
                            <S.Label>U. andar</S.Label>
                          </Tooltip>
                          <Input
                            required
                            onBlur={handleBlur}
                            id="unitPerFloor"
                            onChange={handleChange}
                            value={formikUnit.values.unitPerFloor}
                            aria-describedby="unitPerFloor"
                            placeholder="Digite a quantidade"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            helperText={
                              formikUnit.touched.unitPerFloor &&
                              formikUnit.errors.unitPerFloor
                            }
                            error={
                              formikUnit.touched.unitPerFloor &&
                              Boolean(formikUnit.errors.unitPerFloor)
                            }
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
                            helperText={
                              formikUnit.touched.underground &&
                              formikUnit.errors.underground
                            }
                            error={
                              formikUnit.touched.underground &&
                              Boolean(formikUnit.errors.underground)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} minWidth={280}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip title={'Unidades Total no empreendimento'}>
                            <S.Label>U. T. empreendimento </S.Label>
                          </Tooltip>
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
                            helperText={
                              formikUnit.touched.totalUnitsInDevelopment &&
                              formikUnit.errors.totalUnitsInDevelopment
                            }
                            error={
                              formikUnit.touched.totalUnitsInDevelopment &&
                              Boolean(formikUnit.errors.totalUnitsInDevelopment)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} minWidth={200}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip title={'Total de área privativa'}>
                            <S.Label>T. A. privativa </S.Label>
                          </Tooltip>
                          <Input
                            required
                            disabled
                            placeholder="0"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="totalPrivateAreaQuantity"
                            value={formikUnit.values.totalPrivateAreaQuantity}
                            aria-describedby="totalPrivateAreaQuantity"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={1.5} minWidth={295}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip title={'Área total a construir (m²)'}>
                            <S.Label>A. T. construir (m²) </S.Label>
                          </Tooltip>
                          <Input
                            required
                            onBlur={handleBlur}
                            id="totalToBeBuiltArea"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={formikUnit.values.totalToBeBuiltArea}
                            aria-describedby="totalToBeBuiltArea"
                            placeholder="Digite a quantidade"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            helperText={
                              formikUnit.touched.totalToBeBuiltArea &&
                              formikUnit.errors.totalToBeBuiltArea
                            }
                            error={
                              formikUnit.touched.totalToBeBuiltArea &&
                              Boolean(formikUnit.errors.totalToBeBuiltArea)
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={2} minWidth={340}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip
                            title={'Área total privativa sem permuta (m²)'}
                          >
                            <S.Label>A. T. P. permuta (m²) </S.Label>
                          </Tooltip>
                          <Input
                            required
                            disabled
                            placeholder="0"
                            onBlur={handleBlur}
                            id="totalValueNoExchange"
                            onChange={handleChange}
                            value={formikUnit.values.totalValueNoExchange}
                            aria-describedby="totalValueNoExchange"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            helperText={
                              formikUnit.touched.totalValueNoExchange &&
                              formikUnit.errors.totalValueNoExchange
                            }
                            error={
                              formikUnit.touched.totalValueNoExchange &&
                              Boolean(formikUnit.errors.totalValueNoExchange)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} minWidth={280}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip title={'Valor médio de venda (m²/R$)'}>
                            <S.Label>V. M. venda (m²/R$) </S.Label>
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
                              formikUnit.values.averageSaleValue.toString()
                            )}
                            helperText={
                              formikUnit.touched.averageSaleValue &&
                              formikUnit.errors.averageSaleValue
                            }
                            error={
                              formikUnit.touched.averageSaleValue &&
                              Boolean(formikUnit.errors.averageSaleValue)
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </S.ContainerInputs>
                  <S.ContainerButtons>
                    <Button
                      $isOutline
                      size="80px"
                      className="btnDelete"
                      onClick={() => {
                        setIsDelete(true);
                        setOpenModal(true);
                      }}
                    >
                      Deletar
                    </Button>
                    <div>
                      <Button
                        $isOutline
                        size="80px"
                        onClick={() => setOpenModal(true)}
                      >
                        Cancelar
                      </Button>
                      <Button size="100px" type="submit">
                        Salvar
                      </Button>
                    </div>
                  </S.ContainerButtons>
                </S.Form>
              </FormikProvider>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              Áreas
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <S.Form onSubmit={formikDeadline.handleSubmit}>
                <S.ContainerInputs container spacing={{ xs: 0, sm: 2 }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2.5}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                       <Tooltip title={'Data de início'}>
                      <S.Label>D. início</S.Label>
                  </Tooltip>
                      <Input
                        required
                        id="startDate"
                        onBlur={handleBlur}
                        value={typeMask(
                          MaskType.DATE,
                          formikDeadline.values.startDate
                        )}
                        onChange={(e) => formikDeadline.handleChange(e)}
                        aria-describedby="startDate"
                        placeholder="Digite a Data"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2.5}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <Tooltip title={'Aprovação do projeto (mes)'}>
                      <S.Label>A. projeto (mes)</S.Label>
                  </Tooltip>
                      <Input
                        required
                        onBlur={(e) => {
                          formikDeadline.setFieldValue(
                            'approvalDeadlineInMonth',
                            parseFloat(e.target.value)
                          );
                          handleSumValuesV2({
                            value1: parseFloat(e.target.value),
                            value2: formikDeadline.values.endDate,
                            value3:
                              formikDeadline.values.constructionDeadlineInMonth,
                            fieldName: 'totalDeadlineInMonth',
                            setFieldValue: formikDeadline.setFieldValue
                          });
                        }}
                        id="approvalDeadlineInMonth"
                        placeholder="Digite os meses"
                        aria-describedby="approvalDeadlineInMonth"
                        onChange={(e) => formikDeadline.handleChange(e)}
                        value={formikDeadline.values.approvalDeadlineInMonth}
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <Tooltip title={'Prazo de lançamento (mes)'}>
                      <S.Label>P. lançamento (mes)</S.Label>
                  </Tooltip>
                      <Input
                        required
                        id="endDate"
                        onBlur={(e) => {
                          formikDeadline.setFieldValue(
                            'endDate',
                            parseFloat(e.target.value)
                          );
                          handleSumValuesV2({
                            value1:
                              formikDeadline.values.approvalDeadlineInMonth,
                            value2: parseFloat(e.target.value),
                            value3:
                              formikDeadline.values.constructionDeadlineInMonth,
                            fieldName: 'totalDeadlineInMonth',
                            setFieldValue: formikDeadline.setFieldValue
                          });
                        }}
                        onChange={(e) => formikDeadline.handleChange(e)}
                        value={formikDeadline.values.endDate}
                        aria-describedby="endDate"
                        placeholder="Digite os meses"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2.5}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <Tooltip title={'Execução da obra (mes)'}>
                      <S.Label>E. obra (mes)</S.Label>
                  </Tooltip>
                      <Input
                        required
                        onBlur={(e) => {
                          formikDeadline.setFieldValue(
                            'constructionDeadlineInMonth',
                            parseFloat(e.target.value)
                          );

                          handleSumValuesV2({
                            value1:
                              formikDeadline.values.approvalDeadlineInMonth,
                            value2: formikDeadline.values.endDate,
                            value3: parseFloat(e.target.value),
                            fieldName: 'totalDeadlineInMonth',
                            setFieldValue: formikDeadline.setFieldValue
                          });
                        }}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => formikDeadline.handleChange(e)}
                        placeholder="Digite os meses"
                        id="constructionDeadlineInMonth"
                        value={
                          formikDeadline.values.constructionDeadlineInMonth
                        }
                        aria-describedby="constructionDeadlineInMonth"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2.5}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                       <Tooltip title={'Prazo total (mes)'}>
                      <S.Label>P. total (mes)</S.Label>
                  </Tooltip>
                      <Input
                        required
                        disabled
                        onBlur={handleBlur}
                        onChange={(e) => formikDeadline.handleChange(e)}
                        id="totalDeadlineInMonth"
                        placeholder="Digite os meses"
                        value={formikDeadline.values.totalDeadlineInMonth}
                        aria-describedby="totalDeadlineInMonth"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>
                </S.ContainerInputs>

                <S.ContainerButtons>
                  <Button
                    $isOutline
                    size="80px"
                    className="btnDelete"
                    onClick={() => {
                      setIsDelete(true);
                      setOpenModal(true);
                    }}
                  >
                    Deletar
                  </Button>
                  <div>
                    <Button
                      $isOutline
                      size="80px"
                      onClick={() => setOpenModal(true)}
                    >
                      Cancelar
                    </Button>
                    <Button size="100px" type="submit">
                      Salvar
                    </Button>
                  </div>
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

      <GenericModal
        maxWidth={'650px'}
        maxHeight={'300px'}
        open={openModal}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Icon src={icons.AlertTriangle} alt="Icon alert triangle" />
          <S.Title>{isDelete ? 'Deletar' : 'Cancelar'}</S.Title>
          <S.Text>
            {isDelete
              ? 'Tem certeza de que deseja excluir este projeto?"'
              : 'Todas as alterações não salvas serão perdidas.'}
          </S.Text>
          <S.ContainerButtons>
            <Button
              size="100px"
              disabled={loading}
              onClick={() => {
                setIsDelete(false);
                setOpenModal(false);
              }}
            >
              Não
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              size="100px"
              onClick={() =>
                isDelete
                  ? handleDeleteProject({
                      id,
                      navigate,
                      setLoading,
                      setIsDelete,
                      setSnackbar,
                      setOpenModal
                    })
                  : navigate('/home')
              }
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </Layout>
  );
};
