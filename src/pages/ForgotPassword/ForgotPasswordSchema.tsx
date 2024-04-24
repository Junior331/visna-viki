import * as yup from 'yup';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido.').required('Campo obrigatório')
});
export default forgotPasswordSchema;
