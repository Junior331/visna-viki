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
  },
  {
    label: 'AÇÃO'
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
    label: 'Fase 1',
    description: 'Aquisição terreno'
  },
  {
    label: 'Fase 2',
    description: 'Obra + todas as despesas'
  },
  {
    label: 'Total de Aportes'
  },
  {
    label: 'AÇÃO'
  }
];
export const columnsScenarios: columnType[] = [
  {
    label: 'mês'
  },
  {
    label: 'velocidade de vendas'
  },
  {
    label: 'recebimentos'
  }
];
