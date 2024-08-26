import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ExpandMore, KeyboardArrowDownRounded } from '@mui/icons-material';
import {
  Grid,
  Select,
  MenuItem,
  Accordion,
  FormControl,
  AccordionSummary
} from '@mui/material';

import { icons } from '@/assets/images/icons';
import { Layout } from '@/components/organism';
import { Button, Input } from '@/components/elements';

import { numericMarketAmount } from './utils';
import { GenericModal } from '@/components/modules';
import { scenariosProps } from '../Scenarios/@types';
import { SnackbarContext } from '@/contexts/Snackbar';
import { getListScenarios } from '../Scenarios/services';
import { payloadProfitability, profitabilityProps } from './@types';
import {
  getListProfitability,
  handleDeleteProfitability,
  postProfitability
} from './services';
import { convertToParams, formatCurrency, formatterV2 } from '@/utils/utils';
import * as S from './ProfitabilityStyled';

export const Profitability = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [newProfitability, setNewProfitability] = useState(false);
  const [listScenarios, setListScenarios] = useState<scenariosProps[]>([]);
  const [listProfitability, setListProfitability] = useState<
    profitabilityProps[]
  >([]);
  const [profitabilitySelected, setProfitabilitySelected] =
    useState<profitabilityProps>();

  const [openModal, setOpenModal] = useState(false);
  const { id, name } = Object.fromEntries([...searchParams]);

  const formik = useFormik({
    initialValues: {
      ret: '',
      discount: '',
      comission: '',
      salePrice: '',
      avarageSellingPrice: '',
      projectScenariosHubId: 0
    },
    onSubmit: async (values) => {
      const payload: payloadProfitability = {
        projectId: parseFloat(id),
        discount: parseFloat(values.discount),
        comission: parseFloat(values.comission),
        ret: parseFloat(numericMarketAmount(values.ret)),
        projectScenariosHubId: values.projectScenariosHubId,
        salePrice: parseFloat(numericMarketAmount(values.salePrice)),
        avarageSellingPrice: parseFloat(
          numericMarketAmount(values.avarageSellingPrice)
        )
      };

      postProfitability({
        payload,
        setLoading,
        setSnackbar,
        setListProfitability,
        setNewProfitability,
        id: parseFloat(id)
      });
    }
  });

  const { values, handleSubmit, handleChange, resetForm, setFieldValue } =
    formik;

  const handleModalDelete = (item: profitabilityProps) => {
    setIsDelete(true);
    setOpenModal(true);
    setProfitabilitySelected(item);
  };

  useEffect(() => {
    getListScenarios({
      setLoading,
      setSnackbar,
      setListScenarios,
      id: parseFloat(id)
    });
    getListProfitability({
      setLoading,
      setSnackbar,
      id: parseFloat(id),
      setListProfitability
    });
  }, [id, setSnackbar]);

  return (
    <Layout>
      <S.ProfitabilityContainer>
        <S.Header>
          <Button size="200px" onClick={() => setNewProfitability(true)}>
            Nova Rentabilidade
          </Button>
        </S.Header>

        <S.Content>
          {listProfitability.length ? (
            <>
              {listProfitability.map((item) => {
                return (
                  <Accordion sx={{ width: '100%' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      className="titleAccordion"
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      {item.cenarioName}
                    </AccordionSummary>
                    <S.Form>
                      <Grid
                        container
                        spacing={{ xs: 0, sm: 2 }}
                        alignItems={'center'}
                      >
                        <Grid item xs={12} sm={12} md={3} minWidth={250}>
                          <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                          >
                            <S.Label>Cenário</S.Label>
                            <Input
                              disabled
                              onChange={handleChange}
                              value={item.cenarioName}
                              placeholder="Digite aqui"
                              id="projectScenariosHubId"
                              aria-describedby="projectScenariosHubId"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Preço médio de vendas</S.Label>
                            <Input
                              disabled
                              id="avarageSellingPrice"
                              onChange={handleChange}
                              placeholder="Digite aqui"
                              aria-describedby="avarageSellingPrice"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                              value={formatterV2.format(
                                parseFloat(item.avarageSellingPrice)
                              )}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Desconto</S.Label>
                            <Input
                              id="discount"
                              disabled
                              onChange={handleChange}
                              value={item.discount}
                              aria-describedby="discount"
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Preço de venda</S.Label>
                            <Input
                              disabled
                              id="salePrice"
                              onChange={handleChange}
                              placeholder="Digite aqui"
                              aria-describedby="salePrice"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                              value={formatterV2.format(
                                parseFloat(item.salePrice)
                              )}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>vgv</S.Label>
                            <Input
                              id="vgv"
                              disabled
                              aria-describedby="vgv"
                              onChange={handleChange}
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                              value={formatterV2.format(parseFloat(item.vgv))}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Comissão</S.Label>
                            <Input
                              disabled
                              id="comission"
                              onChange={handleChange}
                              value={item.comission}
                              aria-describedby="comission"
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Regime Especial Tributário</S.Label>
                            <Input
                              id="ret"
                              disabled
                              onChange={handleChange}
                              aria-describedby="ret"
                              placeholder="Digite aqui"
                              value={formatterV2.format(parseFloat(item.ret))}
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <S.Section>
                          <S.Title>Rentabilidade</S.Title>
                          <S.ContainerInfo>
                            <Grid
                              container
                              rowGap={2}
                              columnGap={1}
                              spacing={{ xs: 0, sm: 0 }}
                            >
                              <Grid container rowGap={2} columnGap={1}>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={2.9}
                                  minWidth={250}
                                >
                                  <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    <S.Label>Custo total</S.Label>
                                    <Input
                                      disabled
                                      id="totalCost"
                                      onChange={handleChange}
                                      placeholder="Digite aqui"
                                      aria-describedby="totalCost"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                      value={formatterV2.format(
                                        parseFloat(item.totalCost)
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={2.9}
                                  minWidth={250}
                                >
                                  <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    <S.Label>Exposição maxima</S.Label>
                                    <Input
                                      disabled
                                      id="maximumExposure"
                                      onChange={handleChange}
                                      placeholder="Digite aqui"
                                      aria-describedby="maximumExposure "
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                      value={formatterV2.format(
                                        parseFloat(item.maxExposure)
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={2.9}
                                  minWidth={250}
                                >
                                  <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    <S.Label>Lucro nominal</S.Label>
                                    <Input
                                      disabled
                                      id="nominalProfit"
                                      onChange={handleChange}
                                      placeholder="Digite aqui"
                                      aria-describedby="nominalProfit "
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                      value={formatterV2.format(
                                        parseFloat(item.nominalProfit)
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={2.9}
                                  minWidth={250}
                                >
                                  <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    <S.Label>Lucro/Exposição</S.Label>
                                    <Input
                                      disabled
                                      id="profitExposure"
                                      onChange={handleChange}
                                      placeholder="Digite aqui"
                                      aria-describedby="profitExposure "
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                      value={formatterV2.format(
                                        parseFloat(item.profitExposure)
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={2.9}
                                  minWidth={250}
                                >
                                  <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    <S.Label>Lucro/vgv</S.Label>
                                    <Input
                                      disabled
                                      id="profitGmv"
                                      onChange={handleChange}
                                      placeholder="Digite aqui"
                                      aria-describedby="profitGmv "
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                      value={formatterV2.format(
                                        parseFloat(item.profitGmv)
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={2.9}
                                  minWidth={250}
                                >
                                  <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    <S.Label>TIR (a.m)</S.Label>
                                    <Input
                                      disabled
                                      id="tirAM"
                                      onChange={handleChange}
                                      aria-describedby="tirAM "
                                      placeholder="Digite aqui"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                      value={formatterV2.format(
                                        parseFloat(item.irrMonthly)
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={2.9}
                                  minWidth={250}
                                >
                                  <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    <S.Label>TIR (a.a)</S.Label>
                                    <Input
                                      disabled
                                      id="tirAA"
                                      onChange={handleChange}
                                      aria-describedby="tirAA "
                                      placeholder="Digite aqui"
                                      inputProps={{
                                        style: { fontSize: '1.4rem' }
                                      }}
                                      value={formatterV2.format(
                                        parseFloat(item.irrAnnual)
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>
                          </S.ContainerInfo>
                        </S.Section>
                      </Grid>

                      <Grid
                        container
                        spacing={{ xs: 0, sm: 1 }}
                        alignItems={'center'}
                      >
                        <Grid item xs={12} sm={12} md={12}>
                          <S.ContainerButtons className="containerBtn">
                            <Button
                              $isOutline
                              size="140px"
                              className="btnDelete"
                              onClick={() => handleModalDelete(item)}
                            >
                              Deletar
                            </Button>
                          </S.ContainerButtons>
                        </Grid>
                      </Grid>
                    </S.Form>
                  </Accordion>
                );
              })}
            </>
          ) : (
            <S.Message width={'100%'} height={'auto'}>
              <S.Title>
                Ainda não há rentabilidades criados. Por favor, crie uma nova
                rentabilidade para que ele seja listado aqui.
              </S.Title>
              <Button size="200px" onClick={() => setNewProfitability(true)}>
                Nova Rentabilidade
              </Button>
            </S.Message>
          )}
        </S.Content>
      </S.ProfitabilityContainer>

      <GenericModal
        maxWidth={'850px'}
        maxHeight={'350px'}
        open={newProfitability}
        setOpen={setNewProfitability}
      >
        <S.ContainerMessage>
          <S.Title>Nova Rentabilidade </S.Title>
          <S.Text margin="0 0 20px">
            Essa nova rentabilidade poderá vista na listagem após a criação
          </S.Text>
          <S.Form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={4} minWidth={250}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <S.Label>Cenário</S.Label>
                  <Select
                    required
                    displayEmpty
                    onChange={handleChange}
                    id="projectScenariosHubId"
                    className="SelectComponent"
                    name="projectScenariosHubId"
                    value={values.projectScenariosHubId}
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>

                    {listScenarios.map((item) => {
                      return (
                        <MenuItem value={item.project_scenarios_hub_id}>
                          {item.hub}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Preço médio de vendas</S.Label>
                  <Input
                    id="avarageSellingPrice"
                    onChange={(e) => {
                      setFieldValue(
                        'avarageSellingPrice',
                        formatCurrency(e.target.value)
                      );
                    }}
                    placeholder="Digite aqui"
                    aria-describedby="avarageSellingPrice"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                    value={formatCurrency(values.avarageSellingPrice)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Desconto</S.Label>
                  <Input
                    id="discount"
                    onChange={handleChange}
                    value={values.discount}
                    aria-describedby="discount"
                    placeholder="Digite aqui"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Preço de venda</S.Label>
                  <Input
                    id="salePrice"
                    onChange={(e) => {
                      setFieldValue(
                        'salePrice',
                        formatCurrency(e.target.value)
                      );
                    }}
                    placeholder="Digite aqui"
                    aria-describedby="salePrice"
                    value={formatCurrency(values.salePrice)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Comissão</S.Label>
                  <Input
                    id="comission"
                    onChange={handleChange}
                    value={values.comission}
                    aria-describedby="comission"
                    placeholder="Digite aqui"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} minWidth={250}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Regime Especial Tributário</S.Label>
                  <Input
                    id="ret"
                    onChange={(e) => {
                      setFieldValue('ret', formatCurrency(e.target.value));
                    }}
                    aria-describedby="ret"
                    placeholder="Digite aqui"
                    value={formatCurrency(values.ret)}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 0, sm: 1 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={12}>
                <S.ContainerButtons className="containerBtn">
                  <Button
                    $isOutline
                    size="140px"
                    onClick={() => {
                      resetForm({});
                      setNewProfitability(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="140px"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Adicionar
                  </Button>
                </S.ContainerButtons>
              </Grid>
            </Grid>
          </S.Form>
        </S.ContainerMessage>
      </GenericModal>

      <GenericModal
        open={openModal}
        maxWidth={'650px'}
        maxHeight={'300px'}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Icon src={icons.AlertTriangle} alt="Icon alert triangle" />
          <S.Title>{isDelete ? 'Deletar' : 'Cancelar'}</S.Title>
          <S.Text>
            {isDelete
              ? 'Você perderá essa informação. Esta ação não poderá ser desfeita'
              : 'Você perderá as alterações que ainda não foram salvas'}
          </S.Text>{' '}
          <S.ContainerButtons>
            <Button
              size="100px"
              className="btnDelete"
              onClick={() => setOpenModal(false)}
            >
              Não
            </Button>
            <Button
              size="100px"
              loading={loading}
              disabled={loading}
              onClick={() =>
                isDelete
                  ? handleDeleteProfitability({
                      setLoading,
                      setSnackbar,
                      setIsDelete,
                      setOpenModal,
                      setListProfitability,
                      id: profitabilitySelected?.id as number,
                      idProject: profitabilitySelected?.projectId as number
                    })
                  : navigate(`/edit?${convertToParams({ id, name })}`)
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
