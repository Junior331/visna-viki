import { Route, Routes } from 'react-router-dom';
import {
  Home,
  SignIn,
  SignUp,
  Bills,
  EditProject,
  ResetPassword,
  CreateProject,
  ForgotPassword,
  DetailsBills
} from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/edit" element={<EditProject />} />
      <Route path="/details" element={<DetailsBills />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
};
