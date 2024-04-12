import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ResetPasswordSchema from './ResetPasswordSchema';
import { LayoutAbstract } from '@/components/organism';
import { Button, Input } from '@/components/elements';
import icons from '@/assets/images/icons';
import * as S from './ResetPasswordStyled';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmShow, setPasswordConfirmShow] =
    useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: ({ password, confirmPassword }) => {
      console.log({ password, confirmPassword });
    },
    validationSchema: ResetPasswordSchema
  });
  const { values, touched, errors, handleSubmit, handleChange } = formik;
  return (
    <LayoutAbstract>
      <S.Form onSubmit={handleSubmit}>
        <S.ContainerText>
          <S.Title>Reset Password 🔐</S.Title>
          <S.Text>
            Your new password must be different from previously used passwords
          </S.Text>
        </S.ContainerText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>New Password</S.Label>
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

        <S.ContainerButtons>
          <Button type="submit" size="large">
            Confirm
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
