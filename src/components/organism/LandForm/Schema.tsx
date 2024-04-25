import * as yup from 'yup';

export const landFormSchema = yup.object().shape({
  street: yup
    .string()
    .min(5, 'Endereço inválido, deve ter 5 ou mais caracteres')
    .required('Campo obrigatório'),
  neighborhood: yup
    .string()
    .min(5, 'Bairro inválido, deve ter 5 ou mais caracteres')
    .required('Campo obrigatório'),
  country: yup
    .string()
    .min(5, 'País inválido, deve ter 5 ou mais caracteres')
    .required('Campo obrigatório'),
  state: yup
    .string()
    .min(2, 'Estado inválido, deve ter 2 caracteres')
    .required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  zipCode: yup.string().min(8, 'Cep inválido').required('Campo obrigatório'),
  area: yup.string().required('Campo obrigatório'),
  frontage: yup.string().required('Campo obrigatório'),
  topographyTypeId: yup.string().required('Campo obrigatório'),
  amountPerMeter: yup.string().required('Campo obrigatório'),
  totalAmount: yup.string().required('Campo obrigatório'),
  zoning: yup.string().required('Campo obrigatório')
});

export const projectNameFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Nome inválido, deve ter 3 ou mais caracteres')
    .required('Campo obrigatório')
});
