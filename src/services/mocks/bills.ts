export const bills = {
  costs: {
    shallowCost: {
      id: 1,
      totalValue: 0,
      name: 'Custo Raso',
      land: {
        id: 1,
        totalValue: 0,
        name: 'Terreno, Outorga e Despesas de Aquisição',
        expenses: []
      },
      project: {
        id: 2,
        totalValue: 0,
        name: ' Projetos, Assessorias e Decoração ',
        expenses: []
      },
      constructions: {
        id: 3,
        name: 'Obra',
        totalValue: 0,
        expenses: []
      },
      Licenses: {
        id: 4,
        totalValue: 0,
        name: ' Licenças / Ambiental / Legalização',
        expenses: []
      },
      AdministrativeCosts: {
        id: 5,
        totalValue: 0,
        name: ' Despesas Administrativas',
        expenses: []
      }
    },
    incorporationFee: {
      id: 2,
      totalValue: 0,
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
