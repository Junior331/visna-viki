import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mocks } from '@/services/mocks';
import { breadCrumbsItems } from './utils';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import { GenericModal } from '@/components/modules';
import { Layout, Table } from '@/components/organism';
import { HeaderBreadcrumbs } from '@/components/organism';
import * as S from './DetailsScenarioStyled';
import { convertToParams } from '@/utils/utils';

export const DetailsScenario = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const { id, name } = Object.fromEntries([...searchParams]);

  return (
    <Layout>
      <S.DetailsScenarioContainer>
        <S.Header>
          <HeaderBreadcrumbs
            breadcrumbs={breadCrumbsItems(id, name, 'cenario 01')}
          />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
          </Button>
        </S.Header>
        <S.Content>
          <Table
            rows={[]}
            handleEdit={() => {}}
            className="BoxShadowMenu"
            columns={mocks.columnsScenarios}
          />
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
                navigate(`/scenarios?${convertToParams({ id, name })}`)
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
