import { useFormik } from 'formik';
import { FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordSchema from './ForgotPasswordSchema';
import { LayoutAbstract } from '@/components/organism';
import { Button, Input } from '@/components/elements';
import * as S from './ForgotPasswordStyled';
import icons from '@/assets/images/icons';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: ({ email }) => {
      console.log({ email });
    },
    validationSchema: ForgotPasswordSchema
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    formik;

  return (
    <LayoutAbstract>
      <S.Form onSubmit={handleSubmit}>
        <S.ContainerText>
          <S.Title>Forgot Password? 🔑</S.Title>
          <S.Text>
            Enter your email and we'll send you instructions to reset your
            password.
          </S.Text>
        </S.ContainerText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Email</S.Label>
          <Input
            id="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby="email"
            placeholder="Enter a email"
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
            inputProps={{ style: { fontSize: '1.4rem' } }}
            onKeyUp={() => {
              setFieldValue('email', values.email.replace('/s/g', ''));
            }}
          />
        </FormControl>

        <S.ContainerButtons>
          <Button type="submit" size="large">
            Send link
          </Button>
        </S.ContainerButtons>
        <S.Footer>
          <S.Icon src={icons.arrow} alt="Icon arrow" />
          <S.Link onClick={() => navigate('/')}>Back to login</S.Link>
        </S.Footer>
      </S.Form>
    </LayoutAbstract>
  );
};
