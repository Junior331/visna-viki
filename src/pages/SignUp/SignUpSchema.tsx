import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Senha inválida, deve ter 8 ou mais caracteres')
    .matches(/[a-z]/, 'pelo menos um caractere minúsculo')
    .matches(/[A-Z]/, 'pelo menos um caractere maiúsculo')
    .required('Campo obrigatório'),
  username: yup
    .string()
    .min(3, 'Nome inválido, deve ter 3 ou mais caracteres')
    .required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], `As senhas não são iguais.`)
    .required('Campo obrigatório')
});
export default signUpSchema;
