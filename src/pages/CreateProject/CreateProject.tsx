import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  LandForm,
  UnitsForm,
  SummaryForm,
  DeadlinesForm
} from '@/components/organism';
import { emptyProjectDate, projectDateType } from '@/utils/types';
import { Button } from '@/components/elements';
import { StepProgress } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import { breadCrumbsItems } from './utils';
import * as S from './CreateProjectStyled';

export const CreateProject = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [stepActive, setStepActive] = useState(1);
  const [date, setDate] = useState<projectDateType>(emptyProjectDate);

  const handleStep = (step: number) => {
    if (step > 0 && step < 5) setStepActive(step);
  };

  return (
    <Layout>
      <S.CreateProjectContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems(date.lands.name)} />
          <Button isOutline size="200px" onClick={() => navigate('/home')}>
            Cancelar
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
    </Layout>
  );
};
