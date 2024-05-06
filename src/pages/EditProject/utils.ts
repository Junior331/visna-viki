import { deleteProject } from '@/services/services';
import { handleDeleteProjectProps, handleTabsProps } from './@types';

export const unitSummaryDefault = {
  id: 0,
  netAmount: 0,
  unitHubId: 0,
  unitTypeId: 0,
  averageArea: 0,
  marketAmount: 0,
  unitQuantity: 0,
  exchangeQuantity: 0,
  totalExchangeArea: 0,
  areaPrivativaTotal: 0
};

export const breadCrumbsItems = (name: string) => [
  {
    path: '',
    label: 'Projetos'
  },
  {
    path: '',
    label: 'Editar projeto'
  },
  {
    path: '',
    label: `${name}`
  }
];

export const handleTabs = ({ setValue, newValue }: handleTabsProps) => {
  setValue(newValue);
};

export const handleDeleteProject = async ({
  id,
  navigate,
  setIsLoad,
  setIsDelete,
  setSnackbar,
  setOpenModal
}: handleDeleteProjectProps) => {
  setIsLoad(true);
  try {
    await deleteProject(parseFloat(id));
    setIsLoad(false);
    setOpenModal(false);
    setSnackbar({
      isOpen: true,
      vertical: 'top',
      severity: 'success',
      horizontal: 'right',
      message: 'Projeto deletado com sucesso'
    });
    navigate('/home');
  } catch (error) {
    if (error instanceof Error) {
      setIsLoad(false);
      setIsDelete(false);
      setOpenModal(false);
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
