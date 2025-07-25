// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
// import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import CategoryRacePage from '../features/category_race/CategoryRacePage';
import SidebarLayoutPage from '../features/Sidebar/SidebarLayoutPage';

export const AppRoutes = () => (
  <Routes>
    <Route
    path="/"
    element={
      //outerScrollはSidebarLayoutPageで定義している、overflowYの事
    <SidebarLayoutPage outerScroll={true}>
      <DashboardPage />
    </SidebarLayoutPage>
    }
    />
    <Route
    path="/category"
    element={
    <SidebarLayoutPage>
      <CategoryRacePage />
    </SidebarLayoutPage>
    }
    />
    {/* <Route path="/login" element={<LoginPage />} /> */}
  </Routes>
);
