import { Snackbar } from '@/contexts/Snackbar';
import { Dispatch, SetStateAction } from 'react';

export type profitabilityProps = {
  id: number;
  ret: string;
  vgv: string;
  indexId?: number;
  discount: string;
  totalCost: string;
  projectId: number;
  comission: string;
  profitGmv: string;
  irrAnnual: string;
  salePrice: string;
  irrMonthly: string;
  maxExposure: string;
  cenarioName: string;
  nominalProfit: string;
  profitExposure: string;
  avarageSellingPrice: string;
  project_steps_hub_id: number;
  projectScenariosHubId: number;
};
export type styledProps = {
  size?: string;
  color?: string;
  margin?: string;
};
export type payloadProfitability = {
  ret: number;
  discount: number;
  projectId: number;
  comission: number;
  salePrice: number;
  avarageSellingPrice: number;
  projectScenariosHubId: number;
};
export type handleServicesProps = {
  setSnackbar: (snackbarData: Snackbar) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export type getListProfitabilityProps = handleServicesProps & {
  id: number;
  setListProfitability: Dispatch<SetStateAction<profitabilityProps[]>>;
};
export type postProfitabilityProps = handleServicesProps & {
  id: number;
  payload: payloadProfitability;
  setNewProfitability: Dispatch<SetStateAction<boolean>>;
  setListProfitability: Dispatch<SetStateAction<profitabilityProps[]>>;
};
export type deleteProfitabilityProps = handleServicesProps & {
  id: number;
  idProject: number;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setListProfitability: Dispatch<SetStateAction<profitabilityProps[]>>;
};
