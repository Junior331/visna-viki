import { listProjectsProps, handleFilterAndSearchProps } from './@types';
import { getAllProjects } from './services';

export const listProjects = async ({
  token,
  setList,
  setLoading,
  setSnackbar
}: listProjectsProps) => {
  try {
    const result = await getAllProjects(false, 1, 10000, token);

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
