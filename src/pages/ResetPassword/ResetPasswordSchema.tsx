import * as yup from 'yup';

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Senha inválida, deve ter 8 ou mais caracteres')
    .matches(/[a-z]/, 'pelo menos um caractere minúsculo')
    .matches(/[A-Z]/, 'pelo menos um caractere maiúsculo')
    .required('Campo obrigatório'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], `Passwords don't match.`)
    .required('Campo obrigatório')
});
export default resetPasswordSchema;
