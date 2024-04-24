import * as yup from 'yup';

const deadlinesFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Nome inválido, deve ter 5 ou mais caracteres')
    .required('Campo obrigatório')
  // name: yup
  //   .string()
  //   .min(5, 'Nome inválido, deve ter 3 ou mais caracteres')
  //   .required('Campo obrigatório'),
});
export default deadlinesFormSchema;
