import * as yup from 'yup';

const signInSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Senha inválida, deve ter 8 ou mais caracteres')
    .required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório')
});
export default signInSchema;
