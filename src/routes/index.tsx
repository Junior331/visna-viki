import { Route, Routes } from 'react-router-dom';
import {
  Home,
  SignIn,
  SignUp,
  Aporte,
  Expense,
  ListBills,
  EditProject,
  CostDetails,
  DetailsBills,
  ResetPassword,
  CreateProject,
  ForgotPassword,
  DetailsScenario
} from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/aporte" element={<Aporte />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/edit" element={<EditProject />} />
      <Route path="/listbills" element={<ListBills />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/details" element={<DetailsBills />} />
      <Route path="/costdetails" element={<CostDetails />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/detailsscenario" element={<DetailsScenario />} />
    </Routes>
  );
};
