import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@/components/organism';
import { breadCrumbsItems } from './utils';
import { icons } from '@/assets/images/icons';
import { Button, Input } from '@/components/elements';

import { GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import { convertToParams } from '@/utils/utils';
import * as S from './ProfitabilityStyled';
import { Accordion, AccordionSummary, FormControl, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { ExpandMore } from '@mui/icons-material';

export const Profitability = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const { id, name } = Object.fromEntries([...searchParams]);

  const formik = useFormik({
    initialValues: {
      VGV: '',
      ret: '',
      tirAA: '',
      tirAM: '',
      discount: '',
      profitVGV: '',
      totalCost: '',
      commission: '',
      sellingPrice: '',
      nominalProfit: '',
      profitExposure: '',
      maximumExposure: '',
      averageSalesPrice: ''
    },
    onSubmit: async (values) => {
      console.log(values);
    }
  });
  const formikSceneryTwo = useFormik({
    initialValues: {
      VGV: '',
      ret: '',
      tirAA: '',
      tirAM: '',
      discount: '',
      profitVGV: '',
      totalCost: '',
      commission: '',
      sellingPrice: '',
      nominalProfit: '',
      profitExposure: '',
      maximumExposure: '',
      averageSalesPrice: ''
    },
    onSubmit: async (values) => {
      console.log(values);
    }
  });
  const formikSceneryThree = useFormik({
    initialValues: {
      VGV: '',
      ret: '',
      tirAA: '',
      tirAM: '',
      discount: '',
      profitVGV: '',
      totalCost: '',
      commission: '',
      sellingPrice: '',
      nominalProfit: '',
      profitExposure: '',
      maximumExposure: '',
      averageSalesPrice: ''
    },
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const { values, handleSubmit, handleChange, resetForm } = formik;

  return (
    <Layout>
      <S.ProfitabilityContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(id, name)} />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
          </Button>
        </S.Header>
        <S.Content>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              className="titleAccordion"
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Cenario 1: Vendas a partir do inicio da obra
            </AccordionSummary>
            <S.Form onSubmit={handleSubmit}>
              <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Preço médio de vendas</S.Label>
                    <Input
                      id="averageSalesPrice"
                      onChange={handleChange}
                      value={values.averageSalesPrice}
                      aria-describedby="averageSalesPrice"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
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
                      id="sellingPrice"
                      onChange={handleChange}
                      value={values.sellingPrice}
                      aria-describedby="sellingPrice"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>VGV</S.Label>
                    <Input
                      id="VGV"
                      onChange={handleChange}
                      value={values.VGV}
                      aria-describedby="VGV"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Comissão</S.Label>
                    <Input
                      id="commission"
                      onChange={handleChange}
                      value={values.commission}
                      aria-describedby="commission"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>RET</S.Label>
                    <Input
                      id="ret"
                      onChange={handleChange}
                      value={values.ret}
                      aria-describedby="ret"
                      placeholder="Digite aqui"
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
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Custo total</S.Label>
                            <Input
                              id="totalCost"
                              onChange={handleChange}
                              value={values.totalCost}
                              aria-describedby="totalCost"
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Exposição maxima</S.Label>
                            <Input
                              id="maximumExposure"
                              onChange={handleChange}
                              value={values.maximumExposure}
                              aria-describedby="maximumExposure "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro nominal</S.Label>
                            <Input
                              id="nominalProfit"
                              onChange={handleChange}
                              value={values.nominalProfit}
                              aria-describedby="nominalProfit "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro/Exposição</S.Label>
                            <Input
                              id="profitExposure"
                              onChange={handleChange}
                              value={values.profitExposure}
                              aria-describedby="profitExposure "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro/VGV</S.Label>
                            <Input
                              id="profitVGV"
                              onChange={handleChange}
                              value={values.profitVGV}
                              aria-describedby="profitVGV "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>TIR (a.m)</S.Label>
                            <Input
                              id="tirAM"
                              onChange={handleChange}
                              value={values.tirAM}
                              aria-describedby="tirAM "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>TIR (a.a)</S.Label>
                            <Input
                              id="tirAA"
                              onChange={handleChange}
                              value={values.tirAA}
                              aria-describedby="tirAA "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </S.ContainerInfo>
                </S.Section>
                <Grid item xs={12} sm={12} md={12}>
                  <S.ContainerButtons>
                    <Button
                      $isOutline
                      size="140px"
                      onClick={() => resetForm({})}
                    >
                      Limpar
                    </Button>
                    <Button size="120px" type="submit">
                      Salvar
                    </Button>
                  </S.ContainerButtons>
                </Grid>
              </Grid>
            </S.Form>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              className="titleAccordion"
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Cenario 2: Vendas a partir do meio da obra
            </AccordionSummary>
            <S.Form onSubmit={handleSubmit}>
              <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Preço médio de vendas</S.Label>
                    <Input
                      id="averageSalesPrice"
                      onChange={formikSceneryTwo.handleChange}
                      value={formikSceneryTwo.values.averageSalesPrice}
                      aria-describedby="averageSalesPrice"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Desconto</S.Label>
                    <Input
                      id="discount"
                      onChange={formikSceneryTwo.handleChange}
                      value={formikSceneryTwo.values.discount}
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
                      id="sellingPrice"
                      onChange={formikSceneryTwo.handleChange}
                      value={formikSceneryTwo.values.sellingPrice}
                      aria-describedby="sellingPrice"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>VGV</S.Label>
                    <Input
                      id="VGV"
                      onChange={formikSceneryTwo.handleChange}
                      value={formikSceneryTwo.values.VGV}
                      aria-describedby="VGV"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Comissão</S.Label>
                    <Input
                      id="commission"
                      onChange={formikSceneryTwo.handleChange}
                      value={formikSceneryTwo.values.commission}
                      aria-describedby="commission"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>RET</S.Label>
                    <Input
                      id="ret"
                      onChange={formikSceneryTwo.handleChange}
                      value={formikSceneryTwo.values.ret}
                      aria-describedby="ret"
                      placeholder="Digite aqui"
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
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Custo total</S.Label>
                            <Input
                              id="totalCost"
                              onChange={formikSceneryTwo.handleChange}
                              value={formikSceneryTwo.values.totalCost}
                              aria-describedby="totalCost"
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Exposição maxima</S.Label>
                            <Input
                              id="maximumExposure"
                              onChange={formikSceneryTwo.handleChange}
                              value={formikSceneryTwo.values.maximumExposure}
                              aria-describedby="maximumExposure "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro nominal</S.Label>
                            <Input
                              id="nominalProfit"
                              onChange={formikSceneryTwo.handleChange}
                              value={formikSceneryTwo.values.nominalProfit}
                              aria-describedby="nominalProfit "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro/Exposição</S.Label>
                            <Input
                              id="profitExposure"
                              onChange={formikSceneryTwo.handleChange}
                              value={formikSceneryTwo.values.profitExposure}
                              aria-describedby="profitExposure "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro/VGV</S.Label>
                            <Input
                              id="profitVGV"
                              onChange={formikSceneryTwo.handleChange}
                              value={formikSceneryTwo.values.profitVGV}
                              aria-describedby="profitVGV "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>TIR (a.m)</S.Label>
                            <Input
                              id="tirAM"
                              onChange={formikSceneryTwo.handleChange}
                              value={formikSceneryTwo.values.tirAM}
                              aria-describedby="tirAM "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>TIR (a.a)</S.Label>
                            <Input
                              id="tirAA"
                              onChange={formikSceneryTwo.handleChange}
                              value={formikSceneryTwo.values.tirAA}
                              aria-describedby="tirAA "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </S.ContainerInfo>
                </S.Section>
                <Grid item xs={12} sm={12} md={12}>
                  <S.ContainerButtons>
                    <Button
                      $isOutline
                      size="140px"
                      onClick={() => formikSceneryTwo.resetForm({})}
                    >
                      Limpar
                    </Button>
                    <Button size="120px" type="submit">
                      Salvar
                    </Button>
                  </S.ContainerButtons>
                </Grid>
              </Grid>
            </S.Form>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              className="titleAccordion"
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Cenario 3: Vendas a partir do término da obra
            </AccordionSummary>
            <S.Form onSubmit={formikSceneryThree.handleSubmit}>
              <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Preço médio de vendas</S.Label>
                    <Input
                      id="averageSalesPrice"
                      onChange={formikSceneryThree.handleChange}
                      value={formikSceneryThree.values.averageSalesPrice}
                      aria-describedby="averageSalesPrice"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Desconto</S.Label>
                    <Input
                      id="discount"
                      onChange={formikSceneryThree.handleChange}
                      value={formikSceneryThree.values.discount}
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
                      id="sellingPrice"
                      onChange={formikSceneryThree.handleChange}
                      value={formikSceneryThree.values.sellingPrice}
                      aria-describedby="sellingPrice"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>VGV</S.Label>
                    <Input
                      id="VGV"
                      onChange={formikSceneryThree.handleChange}
                      value={formikSceneryThree.values.VGV}
                      aria-describedby="VGV"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Comissão</S.Label>
                    <Input
                      id="commission"
                      onChange={formikSceneryThree.handleChange}
                      value={formikSceneryThree.values.commission}
                      aria-describedby="commission"
                      placeholder="Digite aqui"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>RET</S.Label>
                    <Input
                      id="ret"
                      onChange={formikSceneryThree.handleChange}
                      value={formikSceneryThree.values.ret}
                      aria-describedby="ret"
                      placeholder="Digite aqui"
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
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Custo total</S.Label>
                            <Input
                              id="totalCost"
                              onChange={formikSceneryThree.handleChange}
                              value={formikSceneryThree.values.tirAA}
                              aria-describedby="totalCost"
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Exposição maxima</S.Label>
                            <Input
                              id="maximumExposure"
                              onChange={formikSceneryThree.handleChange}
                              value={formikSceneryThree.values.tirAA}
                              aria-describedby="maximumExposure "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro nominal</S.Label>
                            <Input
                              id="nominalProfit"
                              onChange={formikSceneryThree.handleChange}
                              value={formikSceneryThree.values.tirAA}
                              aria-describedby="nominalProfit "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro/Exposição</S.Label>
                            <Input
                              id="profitExposure"
                              onChange={formikSceneryThree.handleChange}
                              value={formikSceneryThree.values.tirAA}
                              aria-describedby="profitExposure "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>Lucro/VGV</S.Label>
                            <Input
                              id="profitVGV"
                              onChange={formikSceneryThree.handleChange}
                              value={formikSceneryThree.values.tirAA}
                              aria-describedby="profitVGV "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>TIR (a.m)</S.Label>
                            <Input
                              id="tirAM"
                              onChange={formikSceneryThree.handleChange}
                              value={formikSceneryThree.values.tirAA}
                              aria-describedby="tirAM "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.96} minWidth={250}>
                          <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            fullWidth
                          >
                            <S.Label>TIR (a.a)</S.Label>
                            <Input
                              id="tirAA"
                              onChange={formikSceneryThree.handleChange}
                              value={formikSceneryThree.values.tirAA}
                              aria-describedby="tirAA "
                              placeholder="Digite aqui"
                              inputProps={{ style: { fontSize: '1.4rem' } }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </S.ContainerInfo>
                </S.Section>
                <Grid item xs={12} sm={12} md={12}>
                  <S.ContainerButtons>
                    <Button
                      $isOutline
                      size="140px"
                      onClick={() => formikSceneryThree.resetForm({})}
                    >
                      Limpar
                    </Button>
                    <Button size="120px" type="submit">
                      Salvar
                    </Button>
                  </S.ContainerButtons>
                </Grid>
              </Grid>
            </S.Form>
          </Accordion>
        </S.Content>
      </S.ProfitabilityContainer>

      <GenericModal
        maxWidth={'650px'}
        maxHeight={'300px'}
        open={openModal}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Icon src={icons.AlertTriangle} alt="Icon alert triangle" />
          <S.Title>Cancelar</S.Title>
          <S.Text>Você perderá as alterações que ainda não foram salvas</S.Text>
          <S.ContainerButtons>
            <Button size="100px" onClick={() => setOpenModal(false)}>
              Não
            </Button>
            <Button
              size="100px"
              onClick={() => navigate(`/edit?${convertToParams({ id, name })}`)}
            >
              Sim
            </Button>
          </S.ContainerButtons>
        </S.ContainerMessage>
      </GenericModal>
    </Layout>
  );
};
