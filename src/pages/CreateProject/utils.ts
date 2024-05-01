import {
  createDeadline,
  createLands,
  createProject,
  createUnits
} from '@/services/services';
import { handleSaveInfosByStepProps } from './@types';

export const breadCrumbsItems = (name: string) => [
  {
    path: '',
    label: 'Projetos'
  },
  {
    path: '',
    label: 'Novo projeto'
  },
  {
    path: '',
    label: `${name}`
  }
];

export const handleSaveInfosByStep = async ({
  date,
  stepsIsDone
}: handleSaveInfosByStepProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const stepFunctions: { [key: string]: Function } = {
    '1': async () => {
      const createP = await createProject(date.lands.name);
      const projectId = createP.id;
      await createLands(projectId, date.lands);
      return projectId;
    },
    '2': async (projectId: number) => {
      await createUnits(projectId, date.units);
    },
    '3': async (projectId: number) => {
      await createDeadline(projectId, date.deadline);
    }
  };

  let projectId;
  for (const step of stepsIsDone) {
    if (stepFunctions[step]) {
      projectId = await stepFunctions[step](projectId);
    }
  }
};
