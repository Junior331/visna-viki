/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
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
  unitDefault,
  calculateTUID
} from '@/components/organism/UnitsForm/utils';
import { tabPanelProps } from './@types';
import { getInfoProject } from './services';
import { icons } from '@/assets/images/icons';
import { Layout } from '@/components/organism';
import { emptyProjectInfo } from '@/utils/emptys';
import { GenericModal } from '@/components/modules';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import {
  handleTabs,
  handleEditLand,
  handleSumValues,
  handleEdittUnits,
  breadCrumbsItems,
  handleEditProject,
  handleEditDeadline,
  handleDeleteProject,
  handleCreateDeadline,
  getListUnitCharacteristics
} from './utils';
import {
  typeMask,
  formatterV2,
  handleKeyDown,
  parseFormattedNumber,
  formatDate
} from '@/utils/utils';
import { HeaderBreadcrumbs } from '@/components/organism';
import {
  MaskType,
  payloadSteps,
  projectInfoType,
  unitCharacteristicsType
} from '@/utils/types';
import { editProject } from '@/services/services';
import { Tooltip } from '@/components/elements/Tooltip';
import { Aportes, Bills, Flow, Profitability, Scenarios } from '@/pages';
import unitsFormSchema from '@/components/organism/UnitsForm/UnitsFormSchema';
import { projectNameFormSchema } from '@/components/organism/LandForm/Schema';
import { handleSumValues as handleSumValuesV2 } from '@/components/organism/DeadlinesForm/utils';
import * as S from './EditProjectStyled';

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
  const [listCharacteristics, setListCharacteristics] = useState<
    unitCharacteristicsType[]
  >([]);

  const formikLand = useFormik({
    initialValues: date.land,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        quantitySpecies: parseFloat(values.quantitySpecies.toString()),
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

  const formik = useFormik({
    initialValues: date.unitHub,
    onSubmit: async (values) => {
      const payload = {
        id: values.id,
        projectId: parseFloat(id),
        VGVTotal: values.VGVTotal,
        TotalExchanges: values.TotalExchanges,
        averageSaleValue: values.averageSaleValue,
        projectEfficiency: values.projectEfficiency,
        totalExchangeArea: values.totalExchangeArea,
        flooring: parseFloat(values.flooring.toString()),
        underground: parseFloat(values.underground.toString()),
        unitPerFloor: parseFloat(values.unitPerFloor.toString()),
        totalToBeBuiltArea: parseFloat(values.totalToBeBuiltArea.toString()),
        totalValueNoExchange: values.totalValueNoExchange,
        totalUnitsInDevelopment: values.totalUnitsInDevelopment,
        totalPrivateAreaQuantity: values.totalPrivateAreaQuantity,
        totalAreaOfTheDevelopment: parseFloat(
          values.totalAreaOfTheDevelopment.toString()
        ),
        totalPrivateAreaNetOfExchange: '',
        unit: values.unit.map((unit) => ({
          ...unit
        }))
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
      if (!date.deadline.id) {
        const payloadCreate = {
          startDate: dayjs(values.startDate),
          afterConstruction: values.afterConstruction,
          totalDeadlineInMonth: values.totalDeadlineInMonth,
          approvalDeadlineInMonth: values.approvalDeadlineInMonth,
          constructionDeadlineInMonth: values.constructionDeadlineInMonth,
          projectLaunchDeadlineInMonth: values.projectLaunchDeadlineInMonth
        };

        handleCreateDeadline({
          projectId: parseFloat(id),
          payload: payloadCreate,
          setLoading,
          setSnackbar
        });
      } else {
        const payload: payloadSteps = {
          projectId: parseFloat(id),
          startDate: dayjs(values.startDate),
          totalDeadlineInMonth: values.totalDeadlineInMonth,
          approvalDeadlineInMonth: values.approvalDeadlineInMonth,
          constructionDeadlineInMonth: values.constructionDeadlineInMonth,
          projectLaunchDeadlineInMonth: values.projectLaunchDeadlineInMonth,
          afterConstruction: parseFloat(values.afterConstruction.toString())
        };

        handleEditDeadline({
          payload,
          setLoading,
          setSnackbar
        });
      }
    }
  });

  const formikProjectName = useFormik({
    initialValues: {
      name: name
    },
    onSubmit: async (values) => {
      handleEditProject({
        id: parseFloat(id),
        name: values.name,
        setLoading,
        setSnackbar
      });
      await editProject(parseFloat(id), values.name);
    },
    validationSchema: projectNameFormSchema
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleChange
  } = formik;

  useEffect(() => {
    getInfoProject({ id: parseFloat(id), setDate, setSnackbar });
  }, [id, loading, setSnackbar]);

  useEffect(() => {
    getListUnitCharacteristics({
      setSnackbar,
      setListCharacteristics
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          setFieldValue(fieldName, unit[unitKey]);
        });
      });

      Object.keys(units).forEach((key: string) => {
        setFieldValue(key, units[key]);
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
    if (!values.unit.length) {
      const defaultValue = [
        {
          id: 0,
          netAmount: 0,
          unitTypeId: 0,
          averageArea: 0,
          unitQuantity: 0,
          marketAmount: 0,
          exchangeQuantity: 0,
          areaPrivativaTotal: 0,
          unitCharacteristicsId: ''
        }
      ];
      setFieldValue('unit', defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik, values]);

  useEffect(() => {
    const listUnit = values.unit;
    const totalPrivateAreaQuantity = calculateTUID(
      listUnit,
      'areaPrivativaTotal'
    );
    const marketAmountSum = calculateTUID(listUnit, 'marketAmount');
    const totalExchangeArea = calculateTUID(values.unit, 'areaExchanged');
    const totalUnitsInDevelopment = calculateTUID(listUnit, 'unitQuantity');
    const totalExchanges = calculateTUID(listUnit, 'exchangeQuantity');
    const totalPrivateAreaNetOfExchange =
      values.totalAreaOfTheDevelopment - totalExchangeArea;

    if (totalPrivateAreaNetOfExchange !== null) {
      setFieldValue(
        'totalPrivateAreaNetOfExchange',
        totalPrivateAreaNetOfExchange
      );
    }

    if (totalPrivateAreaQuantity !== null && totalExchangeArea !== null) {
      const totalValueNoExchange = totalPrivateAreaQuantity - totalExchangeArea;
      formik.setFieldValue('totalValueNoExchange', totalValueNoExchange);
    }

    if (totalPrivateAreaQuantity && totalExchangeArea && marketAmountSum) {
      const sum =
        (totalPrivateAreaQuantity - totalExchangeArea) * marketAmountSum;
      formik.setFieldValue('VGVTotal', sum);
    }
    if (totalExchanges) {
      formik.setFieldValue('TotalExchanges', totalExchanges);
    }

    if (totalExchangeArea) {
      setFieldValue('totalExchangeArea', totalExchangeArea);
    }

    if (totalUnitsInDevelopment !== null) {
      setFieldValue('totalUnitsInDevelopment', totalUnitsInDevelopment);
    }

    if (totalPrivateAreaQuantity !== null) {
      setFieldValue('totalPrivateAreaQuantity', totalPrivateAreaQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.unit, values.totalAreaOfTheDevelopment]);

  useEffect(() => {
    if (values.VGVTotal !== null && values.totalValueNoExchange !== null) {
      const sum = values.VGVTotal / values.totalValueNoExchange;
      setFieldValue('averageSaleValue', sum || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.VGVTotal, values.totalValueNoExchange]);

  useEffect(() => {
    const listUnit = values.unit;
    listUnit.map((unit, index) => {
      handleSumValues({
        id: index,
        type: 'sum',
        value1: unit.averageArea.toString(),
        value2: unit.exchangeQuantity.toString(),
        fieldName: 'areaExchanged',
        setFieldValue: setFieldValue
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.unit]);

  return (
    <Layout>
      <S.EditProjectContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(name)} />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
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
                <Tab label="Prazos" {...a11yProps(2)} />
                <Tab label="Contas" {...a11yProps(3)} />
                <Tab label="Cenários" {...a11yProps(4)} />
                <Tab label="Aportes" {...a11yProps(5)} />
                <Tab disabled label="Fluxo" {...a11yProps(6)} />
                <Tab label="Rentabilidade" {...a11yProps(7)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <S.Form
                onSubmit={
                  (formikProjectName.handleSubmit, formikLand.handleSubmit)
                }
              >
                <S.ContainerInputs
                  container
                  className="bgWhite"
                  spacing={{ xs: 0, sm: 2 }}
                >
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
                      <Tooltip title={'Nome do projeto'}>
                        <S.Label>N. Projeto</S.Label>
                      </Tooltip>
                      <Input
                        required
                        id="name"
                        onChange={formikProjectName.handleChange}
                        placeholder="Digite o Nome"
                        aria-describedby="name"
                        value={formikProjectName.values.name}
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
                        onChange={formikLand.handleChange}
                        placeholder="Digite o Cep"
                        aria-describedby="address.zipCode"
                        value={typeMask(
                          MaskType.CEP,
                          formikLand.values.address.zipCode
                        )}
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
                      <S.Label>Endereço</S.Label>
                      <Input
                        required
                        onBlur={formikLand.handleBlur}
                        id="address.street"
                        onChange={formikLand.handleChange}
                        value={formikLand.values.address.street}
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
                        onBlur={formikLand.handleBlur}
                        onChange={formikLand.handleChange}
                        id="address.neighborhood"
                        placeholder="Digite o bairro"
                        value={formikLand.values.address.neighborhood}
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
                        onChange={formikLand.handleChange}
                        placeholder="Digite o país"
                        value={formikLand.values.address.country}
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
                        onChange={formikLand.handleChange}
                        value={formikLand.values.address.state}
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
                        onChange={formikLand.handleChange}
                        placeholder="Digite o número"
                        value={formikLand.values.address.number}
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
                      <Tooltip title={'Área total (m²)'}>
                        <S.Label>A. Total (m²)</S.Label>
                      </Tooltip>
                      <Input
                        id="area"
                        required
                        onChange={formikLand.handleChange}
                        aria-describedby="area"
                        placeholder="Digite a Área total"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        value={typeMask(
                          MaskType.NUMBER,
                          formikLand.values.area.toString()
                        )}
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
                        onChange={formikLand.handleChange}
                        aria-describedby="frontage"
                        placeholder="Digite aqui"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        value={typeMask(
                          MaskType.NUMBER,
                          formikLand.values.frontage.toString()
                        )}
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
                        value={formikLand.values.depave ? 1 : 0}
                        onChange={(e) => {
                          formikLand.setFieldValue(
                            'depave',
                            Boolean(e.target.value)
                          );
                        }}
                        className="SelectComponent"
                        IconComponent={KeyboardArrowDownRounded}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={1}>Sim</MenuItem>
                        <MenuItem value={0}>Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {formikLand.values.depave && (
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
                        <Tooltip title={'Quantidade de espécies'}>
                          <S.Label>Qtd. espécies</S.Label>
                        </Tooltip>
                        <Input
                          required
                          id="quantitySpecies"
                          onChange={formikLand.handleChange}
                          aria-describedby="quantitySpecies"
                          placeholder="Digite aqui"
                          inputProps={{ style: { fontSize: '1.4rem' } }}
                          value={typeMask(
                            MaskType.NUMBER,
                            (formikLand.values.quantitySpecies || 0).toString()
                          )}
                        />
                      </FormControl>
                    </Grid>
                  )}

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
                        onChange={formikLand.handleChange}
                        className="SelectComponent"
                        value={formikLand.values.topographyTypeId}
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
                        onChange={formikLand.handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite o valor"
                        value={formatterV2.format(
                          formikLand.values.amountPerMeter
                        )}
                        aria-describedby="amountPerMeter"
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
                      <Tooltip title={'Valor total (R$)'}>
                        <S.Label>V. Total (R$)</S.Label>
                      </Tooltip>
                      <Input
                        required
                        id="totalAmount"
                        onChange={formikLand.handleChange}
                        aria-describedby="totalAmount"
                        placeholder="Digite o valor total"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                        value={formatterV2.format(
                          formikLand.values.totalAmount
                        )}
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
                        value={formikLand.values.zoning}
                        onChange={formikLand.handleChange}
                        className="SelectComponent"
                        IconComponent={KeyboardArrowDownRounded}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={''} disabled>
                          <em>Selecione a opção </em>
                        </MenuItem>
                        <MenuItem value={'ZM'}>(ZM)</MenuItem>
                        <MenuItem value={'ZC'}>(ZC)</MenuItem>
                        <MenuItem value={'ZEU'}>(ZEU)</MenuItem>
                        <MenuItem value={'ZER'}>(ZER)</MenuItem>
                        <MenuItem value={'Zcore'}>(Zcore)</MenuItem>
                        <MenuItem value={'Operação Urbana'}>
                          (Operação Urbana)
                        </MenuItem>
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
                            pt={5}
                            container
                            rowGap={4}
                            className="containerUnits"
                            spacing={{ xs: 0, sm: 2 }}
                          >
                            {values.unit.map((unit, index) => {
                              return (
                                <S.ContainerInputs
                                  pl={0.5}
                                  container
                                  rowGap={1}
                                  key={unit.keyIndex}
                                  spacing={{ xs: 0, sm: 2 }}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={1.3}
                                    minWidth={170}
                                  >
                                    <FormControl
                                      sx={{ m: 1, width: '25ch' }}
                                      variant="outlined"
                                    >
                                      <Tooltip title={'Tipos de unidades '}>
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
                                          handleChange(e);
                                        }}
                                        className="SelectComponent"
                                        name={`unit[${index}].unitTypeId`}
                                        value={values.unit[index].unitTypeId}
                                        IconComponent={KeyboardArrowDownRounded}
                                        inputProps={{
                                          'aria-label': 'Without label'
                                        }}
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
                                  {Boolean(values.unit[index].unitTypeId) && (
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
                                        <S.Label>Características</S.Label>

                                        <Select
                                          displayEmpty
                                          disabled={
                                            !listCharacteristics[
                                              values.unit[index].unitTypeId - 1
                                            ].children.length
                                          }
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
                                            values.unit[index]
                                              .unitCharacteristicsId || ''
                                          }
                                          IconComponent={
                                            KeyboardArrowDownRounded
                                          }
                                          inputProps={{
                                            'aria-label': 'Without label'
                                          }}
                                        >
                                          <MenuItem value={''} disabled>
                                            <em>Selecione a opção </em>
                                          </MenuItem>
                                          {listCharacteristics[
                                            values.unit[index].unitTypeId - 1
                                          ].children.map((item) => (
                                            <MenuItem value={item.id}>
                                              {item.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                  )}
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
                                          setFieldValue(
                                            `unit[${index}].unitQuantity`,
                                            parseFloat(e.target.value)
                                          );
                                          handleSumValues({
                                            id: index,
                                            type: 'sum',
                                            value1: e.target.value,
                                            setFieldValue: setFieldValue,
                                            fieldName: 'areaPrivativaTotal',
                                            value2: unit.averageArea.toString()
                                          });
                                          handleSumValues({
                                            id: index,
                                            type: 'mult',
                                            value1:
                                              unit.marketAmount.toString(),
                                            value2: e.target.value,
                                            value3:
                                              unit.exchangeQuantity.toString(),
                                            fieldName: 'netAmount',
                                            setFieldValue: setFieldValue
                                          });
                                        }}
                                        id={`unitQuantity-${unit.keyIndex}`}
                                        onChange={(e) => {
                                          setFieldValue(
                                            `unit[${index}].unitQuantity`,
                                            parseFloat(e.target.value)
                                          );
                                        }}
                                        name={`values.unit[${index}].unitQuantity`}
                                        value={
                                          values.unit[index].unitQuantity || 0
                                        }
                                        aria-describedby="unitQuantity"
                                        placeholder="Digite a quantidade"
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
                                    minWidth={165}
                                  >
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
                                            parseFloat(e.target.value) || 0
                                          );
                                          handleSumValues({
                                            id: index,
                                            type: 'sum',
                                            value1: e.target.value,
                                            value2:
                                              unit.unitQuantity.toString(),
                                            fieldName: 'areaPrivativaTotal',
                                            setFieldValue: setFieldValue
                                          });
                                          handleSumValues({
                                            id: index,
                                            type: 'sum',
                                            value1: e.target.value,
                                            value2:
                                              unit.exchangeQuantity.toString(),
                                            fieldName: 'areaExchanged',
                                            setFieldValue: setFieldValue
                                          });
                                        }}
                                        id={`averageArea-${index}`}
                                        onChange={(e) => {
                                          setFieldValue(
                                            `unit[${index}].averageArea`,
                                            parseFloat(e.target.value)
                                          );
                                          handleChange(e);
                                        }}
                                        name={`unit[${index}].averageArea`}
                                        value={values.unit[index].averageArea}
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
                                        <S.Label>A. P. Total</S.Label>
                                      </Tooltip>
                                      <Input
                                        disabled
                                        onBlur={(e) => {
                                          setFieldValue(
                                            `unit[${index}].areaPrivativaTotal`,
                                            parseFloat(e.target.value)
                                          );
                                          handleBlur(e);
                                        }}
                                        id={`areaPrivativaTotal-${index}`}
                                        onChange={(e) => {
                                          setFieldValue(
                                            `unit[${index}].areaPrivativaTotal`,
                                            parseFloat(e.target.value)
                                          );
                                          handleChange(e);
                                        }}
                                        name={`unit[${index}].areaPrivativaTotal`}
                                        value={
                                          values.unit[index].areaPrivativaTotal
                                        }
                                        placeholder="0"
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
                                    md={1.3}
                                    minWidth={180}
                                  >
                                    <FormControl
                                      sx={{ m: 1, width: '25ch' }}
                                      variant="outlined"
                                    >
                                      <Tooltip title={'Quantidade de permutas'}>
                                        <S.Label>Qtd. Permutas (m²)</S.Label>
                                      </Tooltip>
                                      <Input
                                        required
                                        onBlur={(e) => {
                                          setFieldValue(
                                            `unit[${index}].exchangeQuantity`,
                                            parseFloat(e.target.value) || 0
                                          );
                                          handleSumValues({
                                            id: index,
                                            type: 'sum',
                                            value1: unit.averageArea.toString(),
                                            value2: e.target.value,
                                            fieldName: 'areaExchanged',
                                            setFieldValue: setFieldValue
                                          });
                                          handleSumValues({
                                            id: index,
                                            type: 'mult',
                                            value1:
                                              unit.marketAmount.toString(),
                                            value2:
                                              unit.unitQuantity.toString(),
                                            value3: e.target.value,
                                            fieldName: 'netAmount',
                                            setFieldValue: setFieldValue
                                          });
                                        }}
                                        onChange={(e) => {
                                          setFieldValue(
                                            `unit[${index}].exchangeQuantity`,
                                            parseFloat(e.target.value)
                                          );
                                          handleChange(e);
                                        }}
                                        id={`exchangeQuantity-${index}`}
                                        name={`unit[${index}].exchangeQuantity`}
                                        value={
                                          values.unit[index].exchangeQuantity
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
                                      <S.Label>Área permutada (m²)</S.Label>

                                      <Input
                                        required
                                        disabled
                                        onBlur={handleBlur}
                                        id={`areaExchanged-${index}`}
                                        onChange={handleChange}
                                        name={`unit[${index}].areaExchanged`}
                                        value={values.unit[index].areaExchanged}
                                        placeholder="Digite a area"
                                        aria-describedby="areaExchanged"
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
                                    md={1.9}
                                    minWidth={160}
                                  >
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
                                            id: index,
                                            type: 'mult',
                                            value1: e.target.value,
                                            value2:
                                              unit.unitQuantity.toString(),
                                            value3:
                                              unit.exchangeQuantity.toString(),
                                            fieldName: 'netAmount',
                                            setFieldValue: setFieldValue
                                          });
                                        }}
                                        id={`marketAmount-${index}`}
                                        onChange={(e) => {
                                          handleChange(e);
                                          setFieldValue(
                                            `unit[${index}].marketAmount`,
                                            e.target.value
                                          );
                                        }}
                                        defaultValue={formatterV2.format(
                                          values.unit[index].marketAmount
                                        )}
                                        name={`unit[${index}].marketAmount`}
                                        value={parseFormattedNumber(
                                          values.unit[
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
                                        <S.Label>VGV Liq. Permuta (R$)</S.Label>
                                      </Tooltip>
                                      <Input
                                        required
                                        disabled
                                        onBlur={handleBlur}
                                        id={`netAmount-${index}`}
                                        onChange={handleChange}
                                        placeholder="0,00"
                                        aria-describedby="netAmount"
                                        name={`unit[${index}].netAmount`}
                                        value={formatterV2.format(
                                          values.unit[index].netAmount
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
                                    minWidth={values.unit.length > 1 ? 80 : 45}
                                  >
                                    {unit.keyIndex >= 1 && (
                                      <Button
                                        size="30px"
                                        className="btnRemove"
                                        onClick={() => remove(unit.keyIndex)}
                                      >
                                        -
                                      </Button>
                                    )}
                                    <Button
                                      size="30px"
                                      onClick={() =>
                                        push({
                                          ...unitDefault,
                                          keyIndex: values.unit.length
                                        })
                                      }
                                    >
                                      +
                                    </Button>
                                  </Grid>
                                </S.ContainerInputs>
                              );
                            })}
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
                            id="flooring"
                            onBlur={handleBlur}
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
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip title={'Unidades por andar'}>
                            <S.Label>Uni. / Andar</S.Label>
                          </Tooltip>
                          <Input
                            required
                            id="unitPerFloor"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.unitPerFloor}
                            aria-describedby="unitPerFloor"
                            placeholder="Digite a quantidade"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            helperText={
                              touched.unitPerFloor && errors.unitPerFloor
                            }
                            error={
                              touched.unitPerFloor &&
                              Boolean(errors.unitPerFloor)
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
                            value={values.underground}
                            aria-describedby="underground"
                            placeholder="Digite o quantidade"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            helperText={
                              touched.underground && errors.underground
                            }
                            error={
                              touched.underground && Boolean(errors.underground)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} minWidth={280}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip
                            title={'Total de Unidades no empreendimento'}
                          >
                            <S.Label>Total de uni. no emp.</S.Label>
                          </Tooltip>
                          <Input
                            disabled
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="totalUnitsInDevelopment"
                            placeholder="Digite a quantidade"
                            value={values.totalUnitsInDevelopment || 0}
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
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <S.Label>Total de permutas</S.Label>
                          <Input
                            required
                            disabled
                            placeholder="0"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="TotalExchanges"
                            value={values.TotalExchanges}
                            aria-describedby="TotalExchanges"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={2} minWidth={295}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <S.Label>Área total a construir</S.Label>
                          <Input
                            required
                            onBlur={(e) => {
                              setFieldValue(
                                `totalToBeBuiltArea`,
                                e.target.value
                              );
                              console.log(
                                'totalPrivateAreaQuantity :: ',
                                values.totalPrivateAreaQuantity
                              );
                              handleSumValues({
                                id: '',
                                type: 'split',
                                value1:
                                  values.totalPrivateAreaQuantity.toString(),
                                value2: e.target.value,
                                fieldName: 'projectEfficiency',
                                setFieldValue: setFieldValue
                              });
                            }}
                            id="totalToBeBuiltArea"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={values.totalToBeBuiltArea}
                            aria-describedby="totalToBeBuiltArea"
                            placeholder="Digite a quantidade"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            helperText={
                              touched.totalToBeBuiltArea &&
                              errors.totalToBeBuiltArea
                            }
                            error={
                              touched.totalToBeBuiltArea &&
                              Boolean(errors.totalToBeBuiltArea)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} minWidth={200}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <S.Label>Área total privativa</S.Label>
                          <Input
                            required
                            disabled
                            placeholder="0"
                            onBlur={(e) => {
                              setFieldValue(
                                `totalPrivateAreaQuantity`,
                                e.target.value
                              );
                              handleSumValues({
                                id: '',
                                type: 'split',
                                value1: e.target.value,
                                value2: values.totalToBeBuiltArea.toString(),
                                fieldName: 'projectEfficiency',
                                setFieldValue: setFieldValue
                              });
                            }}
                            onChange={handleChange}
                            id="totalPrivateAreaQuantity"
                            value={values.totalPrivateAreaQuantity}
                            aria-describedby="totalPrivateAreaQuantity"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={2.2} minWidth={350}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <S.Label>Área total de permutas</S.Label>
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
                              values.totalExchangeArea || 0
                            )}
                            helperText={
                              touched.totalExchangeArea &&
                              errors.totalExchangeArea
                            }
                            error={
                              touched.totalExchangeArea &&
                              Boolean(errors.totalExchangeArea)
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={2} minWidth={350}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip
                            title={'Área total privativa sem permuta (m²)'}
                          >
                            <S.Label>Área total pri. S/permuta</S.Label>
                          </Tooltip>
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
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <S.Label>VGV Total</S.Label>
                          <Input
                            required
                            disabled
                            placeholder="0,00"
                            onBlur={handleBlur}
                            id="VGVTotal"
                            onChange={handleChange}
                            aria-describedby="VGVTotal"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            value={formatterV2.format(values.VGVTotal)}
                            helperText={touched.VGVTotal && errors.VGVTotal}
                            error={touched.VGVTotal && Boolean(errors.VGVTotal)}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={2.72} minWidth={280}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <Tooltip title={'Valor médio de venda (m²/R$)'}>
                            <S.Label>V. Médio Venda</S.Label>
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
                            value={formatterV2.format(values.averageSaleValue)}
                            helperText={
                              touched.averageSaleValue &&
                              errors.averageSaleValue
                            }
                            error={
                              touched.averageSaleValue &&
                              Boolean(errors.averageSaleValue)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} minWidth={280}>
                        <FormControl
                          sx={{ m: 1, width: '25ch' }}
                          variant="outlined"
                        >
                          <S.Label>Eficiência do projeto(%)</S.Label>

                          <Input
                            required
                            disabled
                            placeholder="0,00"
                            onBlur={handleBlur}
                            id="projectEfficiency"
                            onChange={handleChange}
                            aria-describedby="projectEfficiency"
                            inputProps={{ style: { fontSize: '1.4rem' } }}
                            value={values.projectEfficiency || 0}
                            helperText={
                              touched.projectEfficiency &&
                              errors.projectEfficiency
                            }
                            error={
                              touched.projectEfficiency &&
                              Boolean(errors.projectEfficiency)
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
              <S.Form onSubmit={formikDeadline.handleSubmit}>
                <S.ContainerInputs
                  container
                  className="bgWhite"
                  spacing={{ xs: 0, sm: 2 }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={1.9}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <Tooltip title={'Data de início'}>
                        <S.Label>D. Início</S.Label>
                      </Tooltip>
                      <Input
                        required
                        disabled
                        id="startDate"
                        onBlur={formikDeadline.handleBlur}
                        value={formatDate(formikDeadline.values.startDate)}
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
                        <S.Label>A. Projeto (mes)</S.Label>
                      </Tooltip>
                      <Input
                        required
                        disabled
                        onBlur={(e) => {
                          formikDeadline.setFieldValue(
                            'approvalDeadlineInMonth',
                            parseFloat(e.target.value)
                          );
                          handleSumValuesV2({
                            value1: parseFloat(e.target.value),
                            value2:
                              formikDeadline.values
                                .projectLaunchDeadlineInMonth,
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
                    md={1.9}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <Tooltip title={'Prazo de lançamento (mes)'}>
                        <S.Label>P. Lançamento (mes)</S.Label>
                      </Tooltip>
                      <Input
                        required
                        disabled
                        id="projectLaunchDeadlineInMonth"
                        onBlur={(e) => {
                          formikDeadline.setFieldValue(
                            'projectLaunchDeadlineInMonth',
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
                        value={
                          formikDeadline.values.projectLaunchDeadlineInMonth
                        }
                        aria-describedby="projectLaunchDeadlineInMonth"
                        placeholder="Digite os meses"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={1.9}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <Tooltip title={'Execução da obra (mes)'}>
                        <S.Label>E. Obra (mes)</S.Label>
                      </Tooltip>
                      <Input
                        required
                        disabled
                        onBlur={(e) => {
                          formikDeadline.setFieldValue(
                            'constructionDeadlineInMonth',
                            parseFloat(e.target.value)
                          );

                          handleSumValuesV2({
                            value1:
                              formikDeadline.values.approvalDeadlineInMonth,
                            value2:
                              formikDeadline.values
                                .projectLaunchDeadlineInMonth,
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
                    md={1.8}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <S.Label>Pós obra</S.Label>
                      <Input
                        required
                        disabled
                        id="afterConstruction"
                        onBlur={formikDeadline.handleBlur}
                        value={formikDeadline.values.afterConstruction}
                        onChange={(e) => formikDeadline.handleChange(e)}
                        aria-describedby="afterConstruction"
                        placeholder="Digite os meses"
                        inputProps={{ style: { fontSize: '1.4rem' } }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={1.9}
                    minWidth={250}
                    minHeight={117}
                  >
                    <FormControl
                      sx={{ m: 1, width: '25ch' }}
                      variant="outlined"
                    >
                      <Tooltip title={'Prazo total (mes)'}>
                        <S.Label>P. Total (mes)</S.Label>
                      </Tooltip>
                      <Input
                        required
                        disabled
                        onBlur={formikDeadline.handleBlur}
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
              </S.Form>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <Bills />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={4}>
              <Scenarios />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={5}>
              <Aportes />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={6}>
              <Flow />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={7}>
              <Profitability />
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
              className="btnDelete"
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
                      setOpenModal,
                      setIsUpdate: () => {}
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
