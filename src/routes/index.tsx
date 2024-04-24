import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Home,
  SignIn,
  SignUp,
  ResetPassword,
  CreateProject,
  ForgotPassword
} from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
