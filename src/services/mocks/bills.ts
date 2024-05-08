import { billType } from '@/pages/Bills/@types';
import { v4 as uuidv4 } from 'uuid';

export const bills: billType = {
  bills: [
    {
      id: uuidv4(),
      total: 1972.2,
      name: 'Custo raso',

      expenses: [
        {
          id: uuidv4(),
          value: 524.61,
          name: 'Terreno / Outorga / Despesas de aquisição',
          sub_expenses: [
            {
              id: uuidv4(),
              value: 60.24,
              name: 'Permuta Financeira (% do VGV) - fluxo da venda - não abate do RET (imposto)'
            },
            {
              id: uuidv4(),
              value: 50.12,
              name: 'Terreno - Pagamento'
            },
            {
              id: uuidv4(),
              value: 55.47,
              name: 'Comissão (% do terreno)'
            },
            {
              id: uuidv4(),
              value: 65.83,
              name: 'Ass. Jurídica Aquisição / Certidões / Cartório (% do terreno)'
            },
            {
              id: uuidv4(),
              value: 45.72,
              name: 'Locação Virtual'
            },
            {
              id: uuidv4(),
              value: 70.42,
              name: 'Seguro Permutante'
            },
            {
              id: uuidv4(),
              value: 52.23,
              name: 'Demolição'
            },
            {
              id: uuidv4(),
              value: 58.56,
              name: 'Retificação / Unificação'
            },
            {
              id: uuidv4(),
              value: 66.42,
              name: 'IPTU (Mês)'
            }
          ]
        },
        {
          id: uuidv4(),
          value: 203.43,
          name: 'Obra',
          sub_expenses: [
            {
              id: '',
              value: 37.12,
              name: 'Assessoria Aprovação'
            },
            {
              id: '',
              value: 49.28,
              name: 'Projeto Legal'
            },
            {
              id: '',
              value: 28.57,
              name: 'Projetos Complementares'
            },
            {
              id: '',
              value: 42.91,
              name: 'Decoração Área Comum'
            },
            {
              id: '',
              value: 45.55,
              name: 'Compatibilização de Projetos'
            }
          ]
        },
        {
          id: uuidv4(),
          value: 187.12,
          name: 'Licenças / Ambiental / Legalização ',
          sub_expenses: [
            {
              id: '',
              value: 187.12,
              name: 'Teste'
            }
          ]
        },
        {
          id: uuidv4(),
          value: 425.78,
          name: 'Despesas Administrativas ',
          sub_expenses: [
            {
              id: '',
              value: 425.78,
              name: 'Teste'
            }
          ]
        },
        {
          id: uuidv4(),
          value: 634.31,
          name: 'Taxa de Incorporação ',
          sub_expenses: [
            {
              id: '',
              value: 634.31,
              name: 'Teste'
            }
          ]
        }
      ]
    },
    {
      id: uuidv4(),
      total: 699.31,
      name: 'Taxa de Incorporação',

      expenses: [
        {
          id: uuidv4(),
          value: 699.31,
          name: 'Taxa Administrativas',
          sub_expenses: [
            {
              id: '',
              value: 37.12,
              name: 'Assessoria Aprovação'
            }
          ]
        }
      ]
    }
  ],
  total: 2671.49
};
