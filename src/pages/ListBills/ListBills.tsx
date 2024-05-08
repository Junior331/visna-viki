import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { CloseRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import { FormControl, Grid, MenuItem, Pagination, Select } from '@mui/material';
import { mocks } from '@/services/mocks';
import { breadCrumbsItems } from './utils';
import { handleChangePage } from '../Home/utils';
import { Layout, Table } from '@/components/organism';
import { HeaderBreadcrumbs } from '@/components/organism';
import { Accordion, Button, Input } from '@/components/elements';
import * as S from './ListBillsStyled';

export const ListBills = () => {
  const navigate = useNavigate();
  const [totalPage] = useState(12);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          <Button isOutline size="200px" onClick={() => navigate('/home')}>
            Cancelar
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
    </Layout>
  );
};
