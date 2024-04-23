import { listProjectsProps, handleFilterAndSearchProps } from './@types';
import { getProjects } from './services';

export const listProjects = async ({
  setList,
  setLoading,
  setSnackbar
}: listProjectsProps) => {
  try {
    const result = await getProjects(true);
    setList(result);
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
