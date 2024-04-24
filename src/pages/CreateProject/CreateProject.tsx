import { useNavigate } from 'react-router-dom';
import StepProgressBar from 'react-step-progress';
import {
  Layout,
  LandForm,
  UnitsForm,
  SummaryForm,
  DeadlinesForm
} from '@/components/organism';
import { Button } from '@/components/elements';
// import { StepProgress } from '@/components/modules';
import { HeaderBreadcrumbs } from '@/components/organism';
import { breadCrumbsItems } from './utils';
import * as S from './CreateProjectStyled';

export const CreateProject = () => {
  const navigate = useNavigate();
  // const [page, setPage] = useState(1);

  const step1Content = <LandForm />;
  const step2Content = <UnitsForm />;
  const step3Content = <DeadlinesForm />;
  const step4Content = <SummaryForm />;

  const onFormSubmit = () => {
    console.log('Projeto criado');
  };

  // const nextPage = (page: number) => {
  //   console.log('page ::', page);
  //   console.log('page handle ::', page > 1);
  //   if (page > 0 && page < 5) setPage(page);
  // };

  // const nextPageNumber = (pageNumber: number) => {
  //   switch (pageNumber) {
  //     case 1:
  //       setPage(1);
  //       break;
  //     case 2:
  //       setPage(2);
  //       break;
  //     case 3:
  //       setPage(3);
  //       break;
  //     case 4:
  //       setPage(4);
  //       break;
  //     default:
  //       setPage(1);
  //   }
  // };

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
          {/* <StepProgress
            page={page}
            onPageNumberClick={nextPageNumber}
            steps={0}
          />
          <div>
            <Button isOutline size="200px" onClick={() => nextPage(page - 1)}>
              Voltar
            </Button>
            <Button isOutline size="200px" onClick={() => nextPage(page + 1)}>
              Proximo
            </Button>
          </div> */}

          <StepProgressBar
            startingStep={0}
            nextBtnName="Próximo"
            previousBtnName="Voltar"
            submitBtnName="Finalizar"
            onSubmit={onFormSubmit}
            steps={[
              {
                label: 'Terreno',
                name: 'land',
                content: step1Content
              },
              {
                label: 'Unidades',
                name: 'Units',
                content: step2Content
              },
              {
                label: 'Prazos',
                name: 'deadlines',
                content: step3Content
              },
              {
                label: 'Final',
                name: 'final',
                content: step4Content
              }
            ]}
          />
        </S.Content>
      </S.CreateProjectContainer>
    </Layout>
  );
};
