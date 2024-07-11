import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout, Table } from '@/components/organism';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import { Card, GenericModal } from '@/components/modules';
import { convertToParams } from '@/utils/utils';
import * as S from './FlowStyled';
import { Switch } from '@mui/material';
import { mocks } from '@/services/mocks';
import { useFormik } from 'formik';

export const Flow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showProject, setShowProject] = useState(false);
  const [showLaunchDeadline, setShowLaunchDeadline] = useState(false);
  const [showWork, setshowWork] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const { id, name } = Object.fromEntries([...searchParams]);
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {}
  });
  return (
    <Layout>
      <S.FlowContainer>
        <S.Content>
          <S.Box>
            <S.HeaderBox>
              <S.Title>Aprovação do projeto</S.Title>

              <Switch
                checked={showProject}
                onClick={() => setShowProject(!showProject)}
              />
            </S.HeaderBox>
            {showProject ? (
              <Table formik={formik} rows={[]} columns={mocks.columnsFlow} />
            ) : (
              <Card width={'100%'} height={'auto'} className="bgWhite">
                <S.Label>R$ 6.367,42</S.Label>
              </Card>
            )}
          </S.Box>
          <S.Box color="#FF9F43">
            <S.HeaderBox>
              <S.Title>Prazo de lançamento</S.Title>

              <Switch
                checked={showLaunchDeadline}
                onClick={() => setShowLaunchDeadline(!showLaunchDeadline)}
              />
            </S.HeaderBox>
            {showLaunchDeadline ? (
              <Table formik={formik} rows={[]} columns={mocks.columnsFlow} />
            ) : (
              <Card width={'100%'} height={'auto'} className="bgWhite">
                <S.Label color="#FF9F43">R$ 4.610,56</S.Label>
              </Card>
            )}
          </S.Box>
          <S.Box>
            <S.HeaderBox>
              <S.Title>Obra</S.Title>

              <Switch
                checked={showWork}
                onClick={() => setshowWork(!showWork)}
              />
            </S.HeaderBox>
            {showWork ? (
              <Table formik={formik} rows={[]} columns={mocks.columnsFlow} />
            ) : (
              <Card width={'100%'} height={'auto'} className="bgWhite">
                <S.Label>R$ 2.125.88</S.Label>
              </Card>
            )}
          </S.Box>

          {/* <S.Box>
            <S.HeaderBox>
              <S.Title>Prazo de lançamento </S.Title>

              <Switch />
            </S.HeaderBox>
            <Card width={'100%'} height={'auto'} className="bgWhite">
              <S.Label>R$ 4.610,56</S.Label>
            </Card>
          </S.Box>
          <S.Box color="#FF9F43">
            <S.HeaderBox>
              <S.Title>Obra</S.Title>
              <Switch />
            </S.HeaderBox>
            <Card width={'100%'} height={'auto'} className="bgWhite">
              <S.Label color="#FF9F43">R$ 2.125.88</S.Label>
            </Card>
          </S.Box> */}
        </S.Content>
      </S.FlowContainer>

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
