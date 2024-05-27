import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { breadCrumbsItems, listAportes } from './utils';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import { convertToParams } from '@/utils/utils';
import { GenericModal } from '@/components/modules';
import { SnackbarContext } from '@/contexts/Snackbar';
import { HeaderBreadcrumbs, Layout, Table } from '@/components/organism';
import * as S from './AportesStyled';
import { mocks } from '@/services/mocks';
import { useFormik } from 'formik';

export const Aportes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { id, name } = Object.fromEntries([...searchParams]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [list, setList] = useState<any>([]);

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
      id: parseFloat(id),
      setList,
      setLoading,
      setSnackbar
    });
  }, [id, setSnackbar]);

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
          <S.ContainerExpenses>
            <Table
              formik={formik}
              rows={mocks.rowsAportes}
              columns={mocks.columnsAportes}
            />
          </S.ContainerExpenses>
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
