import { Route, Routes } from 'react-router-dom';
import {
  Home,
  Bills,
  SignIn,
  SignUp,
  Expense,
  Aportes,
  ListBills,
  EditProject,
  CostDetails,
  DetailsBills,
  ResetPassword,
  CreateProject,
  ForgotPassword
} from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aportes" element={<Aportes />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/edit" element={<EditProject />} />
      <Route path="/listbills" element={<ListBills />} />
      <Route path="/details" element={<DetailsBills />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/costdetails" element={<CostDetails />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
};
