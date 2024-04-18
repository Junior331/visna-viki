import { useState } from 'react';
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
import * as S from './SignInStyled';

export const SignIn = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: ({ email, password }) => {
      console.log({ email, password });
      navigate('/home');
    },
    validationSchema: signInSchema
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    formik;

  const [passwordShow, setPasswordShow] = useState<boolean>(false);

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
            placeholder="Enter a email"
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
            placeholder="*******************"
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
          <Button type="submit" size="large">
            Login
          </Button>
        </S.ContainerButtons>
        <S.Footer>
          <S.Text>Novo em nossa plataforma?</S.Text>
          <S.Link onClick={() => navigate('/signup')}>Crie uma conta</S.Link>
        </S.Footer>
      </S.Form>
    </LayoutAbstract>
  );
};
