import * as yup from 'yup';

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Invalid password, must be 8 or more characters')
    .matches(/[a-z]/, 'at least one lowercase char')
    .matches(/[A-Z]/, 'at least one uppercase char')
    .required('Mandatory password field'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], `Passwords don't match.`)
    .required('Mandatory confirm password field')
});
export default resetPasswordSchema;
