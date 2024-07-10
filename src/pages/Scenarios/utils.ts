import { convertToParams } from '@/utils/utils';
import {
  handleProps,
  handleStartChangeProps,
  handleSalesPercentesChangeProps,
  stepNamePhase
} from './@types';

export const listNamePhases = ['Lançamento', 'Obra', 'Pós Obras'];

export const breadCrumbsItems = (id: string, name: string) => [
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: `${name}`
  },
  {
    path: '',
    label: 'Cenários de Venda'
  }
];

export const handleStartChange = ({
  event,
  listPhases,
  setListPhases
}: handleStartChangeProps) => {
  const value = event.target.value;

  let updatedPhases = [49, 50, 51];
  switch (value) {
    case 49:
      updatedPhases = [49, 50, 51];
      break;
    case 50:
      updatedPhases = [50, 51];
      break;
    case 51:
      updatedPhases = [51];
      break;
    default:
      updatedPhases = [];
  }

  const existingPhasesMap = new Map();
  listPhases.forEach((phase) => {
    existingPhasesMap.set(phase.projectStepId, phase);
  });

  const newListPhases = updatedPhases.map((type) => {
    if (existingPhasesMap.has(type)) {
      return existingPhasesMap.get(type);
    }
    return {
      value: 0,
      scenarioTypesId: type || 0,
      projectStepId: [49, 50, 51].includes(type) ? 0 : type,
      name: stepNamePhase[`id_${type}` as keyof typeof stepNamePhase]
    };
  });

  setListPhases(newListPhases);
};

export const handleSalesPercentesChange = ({
  value,
  index,
  listPhases,
  setListPhases
}: handleSalesPercentesChangeProps) => {
  const updatedPhases = [...listPhases];
  updatedPhases[index].value = value;

  const total = updatedPhases.reduce(
    (acc, phase) => acc + (phase.value || 0),
    0
  );
  if (total > 100) {
    const remainingPercent = 100 - (total - value);
    updatedPhases[index].value = remainingPercent >= 0 ? remainingPercent : 0;
  }

  setListPhases(updatedPhases);
};

export const handleView = ({ id, name, navigate, idProject }: handleProps) => {
  const formatedId = id.toString();
  navigate(
    `/detailsscenario?${convertToParams({
      idProject,
      name,
      id: formatedId
    })}`
  );
};
