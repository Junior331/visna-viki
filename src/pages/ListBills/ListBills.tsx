import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CloseRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import { FormControl, Grid, MenuItem, Pagination, Select } from '@mui/material';
import { costType } from './@types';
import { mocks } from '@/services/mocks';
import { Header } from '@/components/modules';
import { handleChangePage } from '../Home/utils';
import { breadCrumbsItems, handleFilter, listCosts } from './utils';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Layout, Table } from '@/components/organism';
import { GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import { rowData } from '@/components/modules/TableBody/@types';
import { Accordion, Button, Input } from '@/components/elements';
import * as S from './ListBillsStyled';

export const ListBills = () => {
  const [totalPage] = useState(12);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<rowData[]>([]);
  const { setSnackbar } = useContext(SnackbarContext);
  const [filteredList, setFilteredList] = useState<rowData[]>(list);
  const [typesCostOptions, setTypesCostOptions] = useState<costType[]>([]);
  const [typesExpenseOptions, setTypesExpenseOptions] = useState<costType[]>(
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      typesCost: '',
      nameExpense: '',
      typesExpense: ''
    },
    onSubmit: async ({ typesCost, nameExpense, typesExpense }) => {
      setIsOpen(false);
      console.log('page ::', page);
      const filteredList = handleFilter({
        list,
        typesCost,
        nameExpense,
        typesExpense
      });

      setFilteredList(filteredList);
    }
  });
  const formikNewExpense = useFormik({
    initialValues: {
      typesCost: '',
      nameExpense: '',
      typesExpense: ''
    },
    onSubmit: async ({ typesCost, nameExpense, typesExpense }) => {
      setOpenModal(false);
      console.log('typesCost ::', typesCost);
      console.log('nameExpense ::', nameExpense);
      console.log('typesExpense ::', typesExpense);
      formikNewExpense.resetForm({});
    }
  });

  useEffect(() => {
    listCosts({
      setList,
      setLoading,
      setSnackbar,
      setTypesCostOptions,
      setTypesExpenseOptions
    });
  }, [setSnackbar]);
  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  const { values, handleSubmit, handleChange, resetForm } = formik;

  return (
    <Layout>
      <Header />
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
                      displayEmpty
                      name="typesCost"
                      onChange={handleChange}
                      value={values.typesCost}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={''} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      {typesCostOptions.map((option) => (
                        <MenuItem value={option.name}>{option.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.2} minWidth={200}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Tipos de despesas</S.Label>
                    <Select
                      displayEmpty
                      name="typesExpense"
                      onChange={handleChange}
                      value={values.typesExpense}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={''} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      {typesExpenseOptions.map((option) => (
                        <MenuItem value={option.name}>{option.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.2} minWidth={250}>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <S.Label>Nome da despesa</S.Label>
                    <Input
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
                      $isOutline
                      size="140px"
                      onClick={() => {
                        setFilteredList(list);
                        resetForm({});
                      }}
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
          {!loading && (
            <>
              <Table rows={filteredList} columns={mocks.columnsExpense} />
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
          <S.Form onSubmit={formikNewExpense.handleSubmit}>
            <Grid container spacing={{ xs: 0, sm: 2 }} alignItems={'center'}>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de custos</S.Label>
                  <Select
                    displayEmpty
                    name="typesCost"
                    onChange={formikNewExpense.handleChange}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    value={formikNewExpense.values.typesCost}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={''} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    {typesCostOptions.map((option) => (
                      <MenuItem value={option.name}>{option.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de despesa</S.Label>
                  <Select
                    displayEmpty
                    name="typesExpense"
                    onChange={formikNewExpense.handleChange}
                    value={formikNewExpense.values.typesExpense}
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={''} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    {typesExpenseOptions.map((option) => (
                      <MenuItem value={option.name}>{option.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={600}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Nome da despesa</S.Label>
                  <Input
                    id="nameExpense"
                    placeholder="Digite o nome"
                    aria-describedby="nameExpense"
                    onChange={formikNewExpense.handleChange}
                    value={formikNewExpense.values.nameExpense}
                    inputProps={{ style: { fontSize: '1.4rem' } }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} minWidth={280} mt={2.3}>
                <S.ContainerButtons className="containerBtn">
                  <Button $isOutline size="140px">
                    Cancelar
                  </Button>
                  <Button size="140px" type="submit">
                    Adicionar
                  </Button>
                </S.ContainerButtons>
              </Grid>
            </Grid>
          </S.Form>
        </S.ContainerMessage>
      </GenericModal>
    </Layout>
  );
};
