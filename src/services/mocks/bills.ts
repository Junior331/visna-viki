export const bills = {
  costs: {
    shallowCost: {
      id: 1,
      name: 'Custo Raso',
      land: {
        id: 1,
        totalValue: 0,
        name: 'Terreno, Outorga e Despesas de Aquisição',
        expenses: [
          {
            id: 11,
            name: 'Permuta Financeira (% do VGV) - fluxo da venda  - não abate do RET (imposto) '
          },
          {
            id: 12,
            name: 'Terreno - Pagamento'
          },
          {
            id: 13,
            name: 'Comissão (% do terreno)'
          },
          {
            id: 14,
            name: 'ITBI (% do terreno + permuta)'
          },
          {
            id: 15,
            name: 'Ass. Jurídica Aquisição / Certidões / Cartório  (% do terreno) '
          },
          {
            id: 16,
            name: 'Outorga Onerosa'
          },
          {
            id: 17,
            name: 'Locação Virtual'
          },
          {
            id: 18,
            name: 'Seguro Permutante'
          },
          {
            id: 19,
            name: 'Demolição'
          },
          {
            id: 20,
            name: 'Retificação / Unificação'
          },
          {
            id: 21,
            name: 'IPTU (Mês)'
          },
          {
            id: 52,
            name: 'teste'
          }
        ]
      },
      project: {
        id: 2,
        totalValue: 0,
        name: ' Projetos, Assessorias e Decoração ',
        expenses: [
          {
            id: 22,
            name: 'Assessoria Aprovação'
          },
          {
            id: 23,
            name: 'Projeto Legal'
          },
          {
            id: 24,
            name: 'Projetos Complementares'
          },
          {
            id: 25,
            name: 'Decoração Área Comum'
          },
          {
            id: 26,
            name: 'Compatibilização de Projetos'
          }
        ]
      },
      constructions: {
        id: 3,
        name: 'Obra',
        totalValue: 0,
        expenses: [
          {
            id: 27,
            name: 'Custo de Obra (R$/m2 privativo)'
          },
          {
            id: 28,
            name: 'Custo com extensão rede concecionárias publicas'
          },
          {
            id: 29,
            name: 'Custo com emissão do ISS'
          }
        ]
      },
      Licenses: {
        id: 4,
        totalValue: 0,
        name: ' Licenças / Ambiental / Legalização',
        expenses: [
          {
            id: 30,
            name: 'Laudo Contaminação (Fase 1 e fase 2)'
          },
          {
            id: 31,
            name: 'Depave'
          },
          {
            id: 32,
            name: 'Topografia'
          },
          {
            id: 33,
            name: 'Cetesp'
          },
          {
            id: 34,
            name: 'Deconti'
          },
          {
            id: 35,
            name: 'Comaer'
          },
          {
            id: 36,
            name: 'Sondagem'
          },
          {
            id: 37,
            name: 'Análise do Metrô'
          }
        ]
      },
      AdministrativeCosts: {
        id: 5,
        totalValue: 0,
        name: ' Despesas Administrativas',
        expenses: [
          {
            id: 38,
            name: 'Contabilidade'
          },
          {
            id: 39,
            name: 'Ass. Jurídica: Minutas de Convenção / Regimento Interno / IPCV / QR'
          },
          {
            id: 40,
            name: 'Taxa da Prefeitura de Aprovação'
          },
          {
            id: 41,
            name: 'Registro da Incorporção'
          },
          {
            id: 42,
            name: 'Registro do Habite-se e Instituição de Condomínio'
          },
          {
            id: 43,
            name: 'Assessoria Jurídica Averbação Habite-se'
          },
          {
            id: 44,
            name: 'Tarifa bancária'
          },
          {
            id: 45,
            name: 'Gerenciadora'
          },
          {
            id: 46,
            name: 'Diversos'
          },
          {
            id: 47,
            name: 'Material de MKT '
          }
        ]
      }
    },
    incorporationFee: {
      id: 2,
      name: 'Taxa da Incorporação',
      administrateTax: {
        id: 6,
        totalValue: 0,
        name: 'Taxa Administrativa',
        expenses: [
          {
            id: 48,
            name: 'Taxa Administrativa'
          }
        ]
      }
    }
  }
};
