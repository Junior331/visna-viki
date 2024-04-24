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
  const [isValid, setIsValid] = useState(false);
  const [stepActive, setStepActive] = useState(1);
  const [date, setDate] = useState<projectDateType>(emptyProjectDate);

  const nextPage = (page: number) => {
    if (page > 0 && page < 5) setStepActive(page);
  };

  const nextPageNumber = (pageNumber: number) => {
    switch (pageNumber) {
      case 1:
        setStepActive(1);
        break;
      case 2:
        setStepActive(2);
        break;
      case 3:
        setStepActive(3);
        break;
      case 4:
        setStepActive(4);
        break;
      default:
        setStepActive(1);
    }
  };

  return (
    <Layout>
      <S.CreateProjectContainer>
        <S.Header>
          <HeaderBreadcrumbs breadcrumbs={breadCrumbsItems('Test')} />
          <Button isOutline size="200px" onClick={() => navigate('/home')}>
            Cancelar
          </Button>
        </S.Header>
        <S.Content>
          <StepProgress
            page={stepActive}
            onPageNumberClick={nextPageNumber}
            steps={0}
          />
          <S.ContainerSteps>
            {stepActive === 1 && (
              <LandForm
                date={date}
                isShow={isShow}
                setDate={setDate}
                setIsShow={setIsShow}
                setIsValid={setIsValid}
              />
            )}
            {stepActive === 2 && (
              <UnitsForm
                date={date}
                setDate={setDate}
                setIsValid={setIsValid}
              />
            )}
            {stepActive === 3 && (
              <DeadlinesForm
                date={date}
                setDate={setDate}
                setIsValid={setIsValid}
              />
            )}
            {stepActive === 4 && <SummaryForm />}
          </S.ContainerSteps>
          <S.ContainerButtons>
            <Button
              isOutline
              size="80px"
              onClick={() => nextPage(stepActive - 1)}
            >
              {stepActive > 1 ? 'Voltar' : 'Cancelar '}
            </Button>
            <Button
              size="100px"
              disabled={isValid}
              noActive={isValid}
              onClick={() => nextPage(stepActive + 1)}
            >
              {stepActive < 4 ? 'Proximo ' : 'Finalizar'}
            </Button>
          </S.ContainerButtons>
        </S.Content>
      </S.CreateProjectContainer>
    </Layout>
  );
};
