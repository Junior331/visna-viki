import * as yup from 'yup';

const deadlinesFormSchema = yup.object().shape({
  endDate: yup.string().required('Campo obrigatório'),
  startDate: yup.string().required('Campo obrigatório'),
  totalDeadlineInMonth: yup.string().required('Campo obrigatório'),
  approvalDeadlineInMonth: yup.string().required('Campo obrigatório'),
  constructionDeadlineInMonth: yup.string().required('Campo obrigatório')
});
export default deadlinesFormSchema;
