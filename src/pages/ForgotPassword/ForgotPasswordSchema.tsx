import * as yup from 'yup';

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid e-mail.')
    .required('Mandatory e-mail field')
});
export default forgotPasswordSchema;
