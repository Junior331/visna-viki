import { useContext, useState } from 'react';
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
import { LayoutAbstract } from '@/components/organism';
import { Button, Checkbox, Input } from '@/components/elements';
import { SnackbarContext } from '@/contexts/Snackbar';
import { signUp } from './services';
import SignUpSchema from './SignUpSchema';
import * as S from './SignUpStyled';

export const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async ({ email, username, password }) => {
      setLoading(true);
      try {
        await signUp({ email, username, password });
        navigate('/');
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
    validationSchema: SignUpSchema
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    formik;

  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmShow, setPasswordConfirmShow] =
    useState<boolean>(false);

  return (
    <LayoutAbstract>
      <S.Form onSubmit={handleSubmit}>
        <S.ContainerText>
          <S.Title>Bem vindo ao Visna 👋🏻</S.Title>
          <S.Text>Faça o registro com sua conta e comece a experiência</S.Text>
        </S.ContainerText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Nome</S.Label>
          <Input
            id="username"
            value={values.username}
            onChange={handleChange}
            aria-describedby="username"
            placeholder="Digite seu nome"
            inputProps={{ style: { fontSize: '1.4rem' } }}
            helperText={touched.username && errors.username}
            error={touched.username && Boolean(errors.username)}
          />
        </FormControl>
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
          <S.Label>Senha</S.Label>
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
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Confirmar senha</S.Label>
          <Input
            id="confirmPassword"
            variant="outlined"
            onChange={handleChange}
            typeElement={OutlinedInput}
            value={values.confirmPassword}
            placeholder="Confirme sua senha"
            inputProps={{ style: { fontSize: '1.4rem' } }}
            type={`${passwordConfirmShow ? 'text' : 'password'}`}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordConfirmShow(!passwordConfirmShow)}
                >
                  {passwordConfirmShow ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {touched.confirmPassword && Boolean(errors.confirmPassword) && (
            <FormHelperText>
              {touched.confirmPassword && errors.confirmPassword}
            </FormHelperText>
          )}
        </FormControl>
        <S.ContainerTerms>
          <Checkbox label="i agree to" />
          <S.Link>privacy policy & terms</S.Link>
        </S.ContainerTerms>

        <S.ContainerButtons>
          <Button
            size="large"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Sign Up
          </Button>
        </S.ContainerButtons>
        <S.Footer>
          <S.Text>
            Already have an account?{' '}
            <S.Link onClick={() => navigate('/')}>Sign in</S.Link>
          </S.Text>
        </S.Footer>
      </S.Form>
    </LayoutAbstract>
  );
};
