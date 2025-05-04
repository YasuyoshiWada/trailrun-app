// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
// import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    {/* <Route path="/login" element={<LoginPage />} /> */}
  </Routes>
);
