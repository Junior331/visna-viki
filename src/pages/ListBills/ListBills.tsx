import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { rowsDataType } from './@types';
import { CloseRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { mocks } from '@/services/mocks';
import { Header } from '@/components/modules';
import { SnackbarContext } from '@/contexts/Snackbar';
import { Layout, Table } from '@/components/organism';
import { GenericModal } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import { Accordion, Button, Input } from '@/components/elements';
import {
  breadCrumbsItems,
  handleCreateExpense,
  handleEditExpense,
  handleFilter,
  listCosts
} from './utils';
import * as S from './ListBillsStyled';

export const ListBills = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<rowsDataType[]>([]);
  const { setSnackbar } = useContext(SnackbarContext);
  const [filteredList, setFilteredList] = useState<rowsDataType[]>(list);

  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      typesCost: 0,
      nameExpense: '',
      typesExpense: 0
    },
    onSubmit: async ({ typesCost, nameExpense, typesExpense }) => {
      setIsOpen(false);
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
      typesCost: 0,
      nameExpense: '',
      typesExpense: 0
    },
    onSubmit: async ({ nameExpense, typesExpense }) => {
      setOpenModal(false);
      const newExpense = {
        expenseName: nameExpense,
        expenseTypeId: typesExpense
      };
      handleCreateExpense({ newExpense, setLoading, setSnackbar });

      listCosts({
        setList,
        setLoading,
        setSnackbar
      });

      formikNewExpense.resetForm({});
    }
  });

  useEffect(() => {
    listCosts({
      setList,
      setLoading,
      setSnackbar
    });
  }, [setSnackbar]);
  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  const { values, handleSubmit, handleChange, setFieldValue, resetForm } =
    formik;

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
                      onChange={(e) => {
                        setFieldValue('typesExpense', 0);
                        handleChange(e);
                      }}
                      value={values.typesCost}
                      className="SelectComponent"
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={0} disabled>
                        <em>Selecione a opção </em>
                      </MenuItem>
                      <MenuItem value={1}>Custo Raso</MenuItem>
                      <MenuItem value={2}>Taxa da Incorporação</MenuItem>
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
                      value={values.typesExpense || 0}
                      className="SelectComponent"
                      disabled={!values.typesCost}
                      IconComponent={KeyboardArrowDownRounded}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={0} disabled>
                        <em>Selecione a opção</em>
                      </MenuItem>
                      {values.typesCost === 1 ? (
                        [
                          <MenuItem key={1} value={1}>
                            Terreno, Outorga e Despesas de Aquisição
                          </MenuItem>,
                          <MenuItem key={2} value={2}>
                            Projetos, Assessorias e Decoração
                          </MenuItem>,
                          <MenuItem key={3} value={3}>
                            Obra
                          </MenuItem>,
                          <MenuItem key={4} value={4}>
                            Licenças / Ambiental / Legalização
                          </MenuItem>,
                          <MenuItem key={5} value={5}>
                            Despesas Administrativas
                          </MenuItem>
                        ]
                      ) : (
                        <MenuItem key={6} value={6}>
                          Taxa Administrativa
                        </MenuItem>
                      )}
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
              <Table
                handleEdit={(item) => {
                  handleEditExpense({
                    navigate: item.navigate,
                    expenseActive: item.expenseActive
                  });
                }}
                formik={formik}
                rows={filteredList}
                columns={mocks.columnsExpense}
              />
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
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    value={formikNewExpense.values.typesCost}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => {
                      formikNewExpense.setFieldValue('typesExpense', 0);
                      formikNewExpense.handleChange(e);
                    }}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    <MenuItem value={1}>Custo Raso</MenuItem>
                    <MenuItem value={2}>Taxa da Incorporação</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} minWidth={300}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <S.Label>Tipos de despesa</S.Label>
                  <Select
                    displayEmpty
                    name="typesExpense"
                    className="SelectComponent"
                    IconComponent={KeyboardArrowDownRounded}
                    onChange={formikNewExpense.handleChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    disabled={!formikNewExpense.values.typesCost}
                    value={formikNewExpense.values.typesExpense || 0}
                  >
                    <MenuItem value={0} disabled>
                      <em>Selecione a opção </em>
                    </MenuItem>
                    {formikNewExpense.values.typesCost === 1 ? (
                      [
                        <MenuItem key={1} value={1}>
                          Terreno, Outorga e Despesas de Aquisição
                        </MenuItem>,
                        <MenuItem key={2} value={2}>
                          Projetos, Assessorias e Decoração
                        </MenuItem>,
                        <MenuItem key={3} value={3}>
                          Obra
                        </MenuItem>,
                        <MenuItem key={4} value={4}>
                          Licenças / Ambiental / Legalização
                        </MenuItem>,
                        <MenuItem key={5} value={5}>
                          Despesas Administrativas
                        </MenuItem>
                      ]
                    ) : (
                      <MenuItem key={6} value={6}>
                        Taxa Administrativa
                      </MenuItem>
                    )}
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
