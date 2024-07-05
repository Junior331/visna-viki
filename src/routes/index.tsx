import { Route, Routes } from 'react-router-dom';
import {
  Home,
  Bills,
  SignIn,
  SignUp,
  Aporte,
  Expense,
  Aportes,
  Scenarios,
  ListBills,
  EditProject,
  CostDetails,
  DetailsBills,
  ResetPassword,
  Profitability,
  CreateProject,
  ForgotPassword,
  DetailsScenario
} from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/aporte" element={<Aporte />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aportes" element={<Aportes />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/edit" element={<EditProject />} />
      <Route path="/scenarios" element={<Scenarios />} />
      <Route path="/listbills" element={<ListBills />} />
      <Route path="/details" element={<DetailsBills />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/costdetails" element={<CostDetails />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/profitability" element={<Profitability />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/detailsscenario" element={<DetailsScenario />} />
    </Routes>
  );
};
