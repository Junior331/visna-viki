import * as yup from 'yup';

const expenseSchema = yup.object().shape({
  name: yup.string().required('Nome da despesa é obrigatório'),
  typesCost: yup.string().required('Tipos de custos é obrigatório'),
  typesExpense: yup.string().required('Tipos de despesas é obrigatório')
});
export default expenseSchema;
