/* eslint-disable @typescript-eslint/no-explicit-any */
import { rowData } from '@/components/modules/TableBody/@types';
import { incorporationFeeType, shallowCostType } from '../Bills/@types';
import { handleEditProps, listBillsProps } from './@types';
import { getDetailsBill } from './services';
import { mocks } from '@/services/mocks';

export const breadCrumbsItems = (projectName: string, bill: string) => [
  {
    path: '',
    label: `${projectName}`
  },
  {
    path: '',
    label: 'Contas'
  },
  {
    path: '',
    label: `${bill}`
  }
];

export const handleEdit = ({ setIsFormEdit }: handleEditProps) => {
  setIsFormEdit((prev) => !prev);
};
export const handleAdd = () => {};
export const handleDelete = () => {};

const calculateSectionTotal = (sectionData: any) => {
  if (sectionData && sectionData.rows) {
    return sectionData.rows.reduce((acc: number, row: any) => {
      const valorTotal = parseFloat(
        row.valor_total.replace('R$ ', '').replace('.', '').replace(',', '.')
      );
      if (!isNaN(valorTotal)) {
        return acc + valorTotal;
      } else {
        return acc;
      }
    }, 0);
  }
  return 0;
};

const addRowsToCosts = (costData: any, newRows: rowData[]) => {
  const sections = [
    'AdministrativeCosts',
    'Licenses',
    'constructions',
    'land',
    'project'
  ];

  let totalCost = 0;

  sections.forEach((section) => {
    if (costData[section]) {
      if (!costData[section].rows) {
        costData[section].rows = [];
      }
      costData[section].rows = [...costData[section].rows, ...newRows];

      const sectionTotal = calculateSectionTotal(costData[section]);
      costData[section].total = sectionTotal.toFixed(2).toString();

      totalCost += sectionTotal;
    }
  });

  costData.total = totalCost.toFixed(2).toString();

  return costData;
};

export const listDetailsBill = async ({
  item,
  setDate,
  setLoading,
  setSnackbar
}: listBillsProps) => {
  setLoading(true);
  try {
    (await getDetailsBill()) as shallowCostType | incorporationFeeType;

    const updatedCost = addRowsToCosts(item, mocks.rows);

    const listCostsStorage = window.sessionStorage.getItem('LIST_COSTS');

    if (listCostsStorage) {
      setDate(JSON.parse(listCostsStorage) as any);
      console.log('listExpenses ::', JSON.parse(listCostsStorage) as any);
    } else {
      window.sessionStorage.setItem('LIST_COSTS', JSON.stringify(updatedCost));
      setDate(updatedCost);
    }
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
