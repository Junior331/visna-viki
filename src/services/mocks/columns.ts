import { columnType } from '@/components/modules/TableHeader/@types';

export const columns: columnType[] = [
  {
    label: 'nome'
  },
  {
    label: 'Unidade'
  },
  {
    label: 'Quantidade'
  },
  {
    label: 'Valor Unitário'
  },
  {
    label: 'Valor Total'
  }
];

export const columnsExpense: columnType[] = [
  {
    label: 'nome'
  },
  {
    label: 'Tipos de custo '
  },
  {
    label: 'Tipos de despesa '
  },
  {
    label: 'AÇÃO'
  }
];
export const columnsAportes: columnType[] = [
  {
    label: 'Data'
  },
  {
    label: 'Observação '
  },
  {
    label: 'Fase 1'
  },
  {
    label: 'Fase 2'
  },
  {
    label: 'Total de Aportes'
  }

];
