import { convertToParams } from '@/utils/utils';
import {
  listProjectsProps,
  handleFilterAndSearchProps,
  handleChangeProjectProps
} from './@types';
import { getAllProjects } from './services';

export const listProjects = async ({
  page,
  setList,
  perPage,
  setLoading,
  setSnackbar,
  setPageTotal
}: listProjectsProps) => {
  try {
    const result = await getAllProjects(page, perPage);

    const newList = result.items.map(
      (obj: {
        id: number;
        status: string;
        progress: string;
        description: string;
        projectName: string;
      }) => ({
        id: obj.id,
        name: obj.projectName,
        text: obj.description || 'O projeto não possui descrição.',
        status: obj.status || 'In Progress',
        progress: obj.progress || 0
      })
    );
    setPageTotal(result.lastPage);
    setList(newList);
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

export const handleFilterAndSearch = ({
  list,
  value,
  option,
  setFilterList,
  setContentActive
}: handleFilterAndSearchProps) => {
  const formattedValue = value?.toUpperCase();

  if (!formattedValue && !option) {
    setFilterList(list);
  } else {
    let newList = list;

    if (option) {
      newList = newList.filter((item) => item.status === option);
    }

    if (formattedValue) {
      newList = newList.filter((item) =>
        item.name.toUpperCase().includes(formattedValue)
      );
      setContentActive?.(formattedValue);
    }

    setFilterList(newList);
  }
};

export const handleChangeProject = ({
  id,
  name,
  navigate
}: handleChangeProjectProps) => {
  navigate(`/edit?${convertToParams({ id, name })}`);
};
