import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { icons } from '@/assets/images/icons';
import { LayoutAbstract } from '@/components/organism';
import { Button, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { forgotPassword } from './services';
import ForgotPasswordSchema from './ForgotPasswordSchema';
import * as S from './ForgotPasswordStyled';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async ({ email }) => {
      setLoading(true);

      try {
        const result = await forgotPassword(email);
        console.log('result ::', result);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false);

          setSnackbar({
            isOpen: true,
            severity: 'error',
            vertical: 'bottom',
            horizontal: 'left',
            message: error.message
          });
        }
      }
    },
    validationSchema: ForgotPasswordSchema
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    formik;

  return (
    <LayoutAbstract>
      <S.Form onSubmit={handleSubmit}>
        <S.ContainerText>
          <S.Title>Esqueci minha senha? 🔑</S.Title>
          <S.Text>
            Digite seu e-mail e nós lhe enviaremos instruções para redefinir sua
            senha.
          </S.Text>
        </S.ContainerText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Email</S.Label>
          <Input
            id="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby="email"
            placeholder="Digite seu email"
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
            inputProps={{ style: { fontSize: '1.4rem' } }}
            onKeyUp={() => {
              setFieldValue('email', values.email.replace('/s/g', ''));
            }}
          />
        </FormControl>

        <S.ContainerButtons>
          <Button
            size="large"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Enviar link
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
