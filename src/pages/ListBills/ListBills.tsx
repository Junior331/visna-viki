import { useState } from 'react';
import { useFormik } from 'formik';
import { CloseRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import { FormControl, Grid, MenuItem, Pagination, Select } from '@mui/material';
import { mocks } from '@/services/mocks';
import { breadCrumbsItems } from './utils';
import { handleChangePage } from '../Home/utils';
import { Layout, Table } from '@/components/organism';

import { HeaderBreadcrumbs } from '@/components/organism';
import { Accordion, Button, Input } from '@/components/elements';
import * as S from './ListBillsStyled';
import { GenericModal } from '@/components/modules';

export const ListBills = () => {
  const [totalPage] = useState(12);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      typesCost: 0,
      nameExpense: '',
      typesExpense: 0
    },
    onSubmit: async (values) => {
      setShow(true);
      setIsOpen(false);
      console.log('page ::', page);
      console.log('values ::', values);
    }
  });
  const { values, handleSubmit, handleChange, resetForm } = formik;

  return (
    <Layout>
      <S.ListBillsContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems()} />
          <Button size="200px" onClick={() => setOpenModal(true)}>
            Nova despesa
          </Button>
        </S.Header>
        <S.Content>
          <Accordion
            isOpen={isOpen}
            handleClick={() => setIsOpen(!isOpen)}
            title={'Selecione e preencha os campos para realizar uma busca'}
          >
            <S.Form onSubmit={handleSubmit}>
              <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
                <Grid item xs={12} sm={12} md={3.2} minWidth={200}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Tipos de custos</S.Label>
                    <Select
                      required
                      displayEmpty
                      name="typesCost"
                      onChange={handleChange}
                      value={values.typesCost}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={0} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      <MenuItem value={1}>Teste 1</MenuItem>
                      <MenuItem value={2}>Teste 2</MenuItem>
                      <MenuItem value={3}>Teste 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.2} minWidth={200}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Tipos de despesas</S.Label>
                    <Select
                      required
                      displayEmpty
                      name="typesExpense"
                      onChange={handleChange}
                      value={values.typesExpense}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={0} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      <MenuItem value={1}>Teste 1</MenuItem>
                      <MenuItem value={2}>Teste 2</MenuItem>
                      <MenuItem value={3}>Teste 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.2} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Nome da despesa</S.Label>
                    <Input
                      required
                      id="nameExpense"
                      onChange={handleChange}
                      value={values.nameExpense}
                      aria-describedby="nameExpense"
                      placeholder="Digite o nome"
                      inputProps={{ style: { fontSize: '1.4rem' } }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={2.3} minWidth={280} mt={2.3}>
                  <S.ContainerButtons>
                    <Button
                      isOutline
                      size="140px"
                      onClick={() => resetForm({})}
                    >
                      <CloseRounded />
                      Limpar
                    </Button>
                    <Button size="120px" type="submit">
                      Buscar
                    </Button>
                  </S.ContainerButtons>
                </Grid>
              </Grid>
            </S.Form>
          </Accordion>

          {show && (
            <>
              <Table rows={mocks.rowsExpense} columns={mocks.columnsExpense} />
              <S.ContainerPagination>
                <Pagination
                  color="primary"
                  showLastButton
                  showFirstButton
                  count={totalPage}
                  onChange={(_e, index) => {
                    handleChangePage({ newPage: index, setPage });
                  }}
                />
              </S.ContainerPagination>
            </>
          )}
        </S.Content>
      </S.ListBillsContainer>

      <GenericModal
        maxWidth={'750px'}
        maxHeight={'400px'}
        open={openModal}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Title>Novo tipo de despesa</S.Title>
          <S.Text>
            Esse novo tipo de despesa podera ser usado nos proximos cadastros
          </S.Text>
          <S.Form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipo de custos</S.Label>
                  <Select
                    required
                    displayEmpty
                    name="typesCost"
                    onChange={handleChange}
                    value={values.typesCost}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Custo raso </em>
                    </MenuItem>
                    <MenuItem value={1}>Teste 1</MenuItem>
                    <MenuItem value={2}>Teste 2</MenuItem>
                    <MenuItem value={3}>Teste 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipo de despesa</S.Label>
                  <Input
                    required
                    id="nameExpense"
                    onChange={handleChange}
                    value={values.nameExpense}
                    aria-describedby="nameExpense"
                    placeholder="Terreno / Outurga / Despesas de aquisiçoes"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={600}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Nome</S.Label>
                  <Input
                    required
                    id="nameExpense"
                    onChange={handleChange}
                    value={values.nameExpense}
                    aria-describedby="nameExpense"
                    placeholder="Terreno - Pagamento"
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={280} mt={2.3}>
                <S.ContainerButtons>
                  <Button isOutline size="140px">
                    Cancelar
                  </Button>
                  <Button size="140px">Adicionar</Button>
                </S.ContainerButtons>
              </Grid>
            </Grid>
          </S.Form>
        </S.ContainerMessage>
      </GenericModal>
    </Layout>
  );
};