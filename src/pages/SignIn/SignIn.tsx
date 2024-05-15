import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import signInSchema from './SignInSchema';
import { LayoutAbstract } from '@/components/organism';
import { Button, Checkbox, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { getInfoUser, signIn } from './services';
import * as S from './SignInStyled';
import { UserContext } from '@/state/user/state';

export const SignIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      setLoading(true);
      try {
        const { accessToken } = await signIn({ email, password });
        window.sessionStorage.setItem('TOKEN', accessToken);

        setLoading(false);
        if (accessToken) {
          getInfoUser({ dispatch });

          navigate('/home');
        }
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
    validationSchema: signInSchema
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    formik;

  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  useEffect(() => {
    window.sessionStorage.removeItem('TOKEN');
  }, []);

  return (
    <LayoutAbstract>
      <S.Form onSubmit={handleSubmit}>
        <S.ContainerText>
          <S.Title>Bem vindo ao Visna 👋🏻</S.Title>
          <S.Text>Faça login em sua conta e comece a experiência</S.Text>
        </S.ContainerText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Email</S.Label>
          <Input
            id="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby="email"
            placeholder="Digite seu email"
            inputProps={{ style: { fontSize: '1.4rem' } }}
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
            onKeyUp={() => {
              setFieldValue('email', values.email.replace('/s/g', ''));
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>
            Password{' '}
            <S.Link onClick={() => navigate('/forgotpassword')}>
              Forgot Password?
            </S.Link>
          </S.Label>
          <Input
            id="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            typeElement={OutlinedInput}
            placeholder="Digite sua senha"
            inputProps={{ style: { fontSize: '1.4rem' } }}
            type={`${passwordShow ? 'text' : 'password'}`}
            error={touched.password && Boolean(errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  {passwordShow ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {touched.password && Boolean(errors.password) && (
            <FormHelperText>
              {touched.password && errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <Checkbox label="Lembre-me" />

        <S.ContainerButtons>
          <Button
            size="large"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </S.ContainerButtons>
        {/* <S.Footer>
          <S.Text>
            Novo em nossa plataforma?{' '}
            <S.Link onClick={() => navigate('/signup')}>Crie uma conta</S.Link>
          </S.Text>
        </S.Footer> */}
      </S.Form>
    </LayoutAbstract>
  );
};
