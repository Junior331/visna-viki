import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  LandForm,
  UnitsForm,
  SummaryForm,
  DeadlinesForm
} from '@/components/organism';
import { breadCrumbsItems, handleSaveInfosByStep } from './utils';
import { icons } from '@/assets/images/icons';
import { Button } from '@/components/elements';
import { HeaderBreadcrumbs } from '@/components/organism';
import { StepsIsDoneContext } from '@/contexts/StepIsDone';

import { projectDateType, unitCharacteristicsType } from '@/utils/types';
import { emptyProjectDate } from '@/utils/emptys';
import { GenericModal, StepProgress } from '@/components/modules';
import * as S from './CreateProjectStyled';
import { getListUnitCharacteristics } from '../EditProject/utils';
import { SnackbarContext } from '@/contexts/Snackbar';

export const CreateProject = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [stepActive, setStepActive] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { stepsIsDone } = useContext(StepsIsDoneContext);
  const [date, setDate] = useState<projectDateType>(emptyProjectDate);
  const [listCharacteristics, setListCharacteristics] = useState<
    unitCharacteristicsType[]
  >([]);
  const handleStep = (step: number) => {
    if (step > 0 && step < 5) setStepActive(step);
  };

  useEffect(() => {
    if (stepActive && stepsIsDone.length < 2) {
      getListUnitCharacteristics({
        setSnackbar,
        setListCharacteristics
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSnackbar, setListCharacteristics]);

  return (
    <Layout>
      <S.CreateProjectContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(date.lands.name)} />
          <Button $isOutline size="200px" onClick={() => setOpenModal(true)}>
            Voltar
          </Button>
        </S.Header>
        <S.Content>
          <StepProgress page={stepActive} />
          <S.ContainerSteps>
            {stepActive === 1 && (
              <LandForm
                date={date}
                isShow={isShow}
                setDate={setDate}
                setIsShow={setIsShow}
                handleStep={handleStep}
              />
            )}
            {stepActive === 2 && (
              <UnitsForm
                date={date}
                setDate={setDate}
                handleStep={handleStep}
                listCharacteristics={listCharacteristics}
              />
            )}
            {stepActive === 3 && (
              <DeadlinesForm
                date={date}
                setDate={setDate}
                handleStep={handleStep}
              />
            )}
            {stepActive === 4 && (
              <SummaryForm date={date} handleStep={handleStep} />
            )}
          </S.ContainerSteps>
        </S.Content>
      </S.CreateProjectContainer>

      <GenericModal
        open={openModal}
        maxWidth={'650px'}
        maxHeight={'300px'}
        setOpen={setOpenModal}
      >
        <S.ContainerMessage>
          <S.Icon src={icons.AlertTriangle} alt="Icon alert triangle" />
          <S.Title>
            {stepsIsDone.length ? 'Salvar alterações' : 'Cancelar'}{' '}
          </S.Title>
          <S.Text>
            {stepsIsDone.length
              ? `Deseja salvar as alterações das etapas (${stepsIsDone.join(
                  ' - '
                )}) que foram concluidas ?`
              : 'Você perderá as alterações que ainda não foram salvas'}
          </S.Text>
          <S.ContainerButtons>
            <Button
              size="100px"
              onClick={() =>
                stepsIsDone.length ? navigate('/home') : setOpenModal(false)
              }
            >
              Não
            </Button>
            <Button
              size="100px"
              onClick={() =>
                stepsIsDone.length
                  ? handleSaveInfosByStep({
                      date,
                      navigate,
                      stepsIsDone,
                      setOpenModal
                    })
                  : navigate('/home')
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
