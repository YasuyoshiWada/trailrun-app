// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
// import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import CategoryRacePage from '../features/category_race/CategoryRacePage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/category" element={<CategoryRacePage />} />
    {/* <Route path="/login" element={<LoginPage />} /> */}
  </Routes>
);
