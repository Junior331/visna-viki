import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, SignIn } from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
