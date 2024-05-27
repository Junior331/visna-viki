import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mocks } from '@/services/mocks';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import { convertToParams } from '@/utils/utils';
import { SnackbarContext } from '@/contexts/Snackbar';
import { breadCrumbsItems, listAportes } from './utils';
import { GenericModal, Pagination } from '@/components/modules';
import { HeaderBreadcrumbs, Layout, Table } from '@/components/organism';
import * as S from './AportesStyled';
import { aportesProps } from './@types';

export const Aportes = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(10);
  const [pageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [list, setList] = useState<aportesProps[]>([]);
  const { id, name } = Object.fromEntries([...searchParams]);

  const formik = useFormik({
    initialValues: {
      typesCost: 0,
      nameExpense: '',
      typesExpense: 0
    },
    onSubmit: async () => {}
  });

  useEffect(() => {
    listAportes({
      page,
      setList,
      perPage,
      setLoading,
      setSnackbar,
      setPageTotal,
      id: parseFloat(id)
    });
  }, [id, page, perPage, setSnackbar]);

  return (
    <Layout>
      <S.AportesContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems({
              id,
              name
            })}
          />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Cancelar
          </Button>
        </S.Header>
        <S.Content>
          {loading ? (
            <Backdrop open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <>
              <Table
                formik={formik}
                rows={list}
                columns={mocks.columnsAportes}
              />

              {pageTotal > 1 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  perPage={perPage}
                  pageTotal={pageTotal}
                  setPerPage={setPerPage}
                  setPageTotal={setPageTotal}
                />
              )}
            </>
          )}
        </S.Content>
      </S.AportesContainer>

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
