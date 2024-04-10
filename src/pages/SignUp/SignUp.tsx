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
import SignUpSchema from './SignUpSchema';
import { LayoutAbstract } from '@/components/modules';
import { Button, Checkbox, Input } from '@/components/elements';
import * as S from './SignUpStyled';

export const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: ({ email, username, password, confirmPassword }) => {
      console.log({ email, username, password, confirmPassword });
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
          <S.Title>Welcome to Visna! 👋🏻</S.Title>
          <S.Text>
            Please sign-up to your account and start the adventure
          </S.Text>
        </S.ContainerText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Username</S.Label>
          <Input
            id="username"
            value={values.username}
            onChange={handleChange}
            aria-describedby="username"
            placeholder="Enter a username"
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
          <S.Label>Password</S.Label>
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
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Confirm Password</S.Label>
          <Input
            id="confirmPassword"
            variant="outlined"
            onChange={handleChange}
            typeElement={OutlinedInput}
            value={values.confirmPassword}
            placeholder="*******************"
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
          <Button type="submit" size="large">
            Sign Up
          </Button>
        </S.ContainerButtons>
        <S.Footer>
          <S.Text>Already have an account?</S.Text>
          <S.Link onClick={() => navigate('/')}>Sign in</S.Link>
        </S.Footer>
      </S.Form>
    </LayoutAbstract>
  );
};
