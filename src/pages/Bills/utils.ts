import { convertToParams } from '@/utils/utils';
import {
  handleProps,
  listCostsProps,
  genericObjType,
  costsType,
  shallowCostType,
  incorporationFeeType
} from './@types';
import { getCostsByProject } from './services';

export const emptyInfo = (info: string | number | genericObjType) =>
  info instanceof Object &&
  'id' in info &&
  'name' in info &&
  'expenses' in info;

export const breadCrumbsItems = (id: string, name: string) => [
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: `${name}`
  },
  {
    path: '',
    label: 'Contas'
  }
];
export const handleEdit = ({
  id,
  name,
  cost,
  navigate,
  idProject
}: handleProps) => {
  const formatedId = id.toString();

  navigate(
    `/details?isEdit=true&${convertToParams({
      idProject,
      name,
      id: formatedId
    })}`,
    {
      state: {
        cost
      }
    }
  );
};
export const handleView = ({ id, idProject, name, navigate }: handleProps) => {
  const formatedId = id.toString();
  navigate(
    `/details?isEdit=false${convertToParams({
      idProject,
      name,
      id: formatedId
    })}`
  );
};
export const handleDelete = () => {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateTotalValueCost = (cost: any) =>
  cost.shallowCost.totalValue + cost.incorporationFee.totalValue;

const calculateTotalValue = (shallowCost: shallowCostType) => {
  return (
    shallowCost.land.totalValue +
    shallowCost.project.totalValue +
    shallowCost.constructions.totalValue +
    shallowCost.Licenses.totalValue +
    shallowCost.AdministrativeCosts.totalValue
  );
};

const calculateTotalValueForIncorporationFee = (
  incorporationFee: incorporationFeeType
) => {
  return incorporationFee.administrateTax.totalValue;
};

export const listCosts = async ({
  id,
  setDate,
  setLoading,
  setSnackbar
}: listCostsProps) => {
  setLoading(true);
  try {
    const result = (await getCostsByProject(id)) as costsType;
    const newCosts: costsType = {
      ...result,
      costs: {
        ...result.costs,
        shallowCost: {
          ...result.costs.shallowCost,
          totalValue: calculateTotalValue(result.costs.shallowCost)
        },
        incorporationFee: {
          ...result.costs.incorporationFee,
          totalValue: calculateTotalValueForIncorporationFee(
            result.costs.incorporationFee
          )
        }
      }
    };

    // const newCostsFinish: costsTypeV2 = {
    //   costs: {
    //     ...newCosts.costs,
    //     totalValue: calculateTotalValueCost(newCosts)
    //   }
    // };
    setDate(newCosts);
    setLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setLoading(false);
      setSnackbar({
        isOpen: true,
        severity: 'error',
        vertical: 'bottom',
        horizontal: 'left',
        message: error.message
      });
    }
  }
};
