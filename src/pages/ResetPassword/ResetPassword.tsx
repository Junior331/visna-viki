import { useContext, useState } from 'react';
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
import { SnackbarContext } from '@/contexts/Snackbar';
import { LayoutAbstract } from '@/components/organism';
import { Button, Input } from '@/components/elements';
import { icons } from '@/assets/images/icons';
import { resetPassword } from './services';
import ResetPasswordSchema from './ResetPasswordSchema';
import * as S from './ResetPasswordStyled';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { setSnackbar } = useContext(SnackbarContext);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmShow, setPasswordConfirmShow] =
    useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: async ({ password }) => {
      try {
        const result = await resetPassword(password);
        console.log('result ::', result);
      } catch (error) {
        if (error instanceof Error) {
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
    validationSchema: ResetPasswordSchema
  });
  const { values, touched, errors, handleSubmit, handleChange } = formik;
  return (
    <LayoutAbstract>
      <S.Form onSubmit={handleSubmit}>
        <S.ContainerText>
          <S.Title>Redefinir senha 🔐</S.Title>
          <S.Text>
            Sua nova senha deve ser diferente das senhas usadas anteriormente
          </S.Text>
        </S.ContainerText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <S.Label>Nova senha</S.Label>
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
