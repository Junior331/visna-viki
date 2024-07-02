import * as yup from 'yup';

const unitsFormSchema = yup.object().shape({
  flooring: yup.string().required('Campo obrigatório'),
  unitPerFloor: yup.string().required('Campo obrigatório'),
  underground: yup.string().required('Campo obrigatório'),
  totalToBeBuiltArea: yup.string().required('Campo obrigatório'),
  totalValueNoExchange: yup.string().required('Campo obrigatório'),
  averageSaleValue: yup.string().required('Campo obrigatório')
});

export default unitsFormSchema;
