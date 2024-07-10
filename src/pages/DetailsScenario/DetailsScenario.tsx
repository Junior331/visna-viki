import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mocks } from '@/services/mocks';
import { breadCrumbsItems } from './utils';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import { convertToParams, formatMMYYYYDate } from '@/utils/utils';
import { getDetailsScenario } from './services';
import { Card, GenericModal } from '@/components/modules';
import { scenariosProps } from '../Scenarios/@types';
import { Layout, Table } from '@/components/organism';
import { SnackbarContext } from '@/contexts/Snackbar';
import { emptySummaryScenarios } from '@/utils/emptys';
import { HeaderBreadcrumbs } from '@/components/organism';
import * as S from './DetailsScenarioStyled';
import { rowData } from '@/components/modules/TableBody/@types';

export const DetailsScenario = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { id, idProject, name } = Object.fromEntries([...searchParams]);
  const [summaryScenarios, setSummaryScenarios] = useState<scenariosProps>(
    emptySummaryScenarios
  );

  useEffect(() => {
    getDetailsScenario({
      setLoading,
      setSnackbar,
      id: parseFloat(id),
      setSummaryScenarios,
      projectId: parseFloat(idProject)
    });
  }, [id, idProject, setSnackbar]);
  useEffect(() => {
    console.log('loading ::', loading);
    console.log('summaryScenarios ::', summaryScenarios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryScenarios]);

  return (
    <Layout>
      <S.DetailsScenarioContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems(id, name, summaryScenarios.hub)}
          />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
          </Button>
        </S.Header>
        <S.Content>
          {summaryScenarios.phases.map((phase) => {
            const months = phase.months.map((month) => {
              const obj = {
                month: month.month,
                date: formatMMYYYYDate(month.date),
                salesPercents: `${month.salesPercents} %`,
                receipts: month.receipts || '-'
              };
              return obj;
            });
            return (
              <Card
                width={'100%'}
                height={'auto'}
                className="bgWhite containerTable"
              >
                <S.Title>{phase.step_name}</S.Title>
                <Table
                  handleEdit={() => {}}
                  className="BoxShadowMenu"
                  rows={months as rowData[]}
                  columns={mocks.columnsScenarios}
                />
              </Card>
            );
          })}
        </S.Content>
      </S.DetailsScenarioContainer>

      <GenericModal
        open={openModal}
        maxWidth={'650px'}
        maxHeight={'300px'}
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
              onClick={() =>
                navigate(`/edit?${convertToParams({ id: idProject, name })}`)
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
