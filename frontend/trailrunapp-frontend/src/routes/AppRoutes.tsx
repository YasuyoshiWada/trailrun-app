// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
// import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import CategoryRacePage from '../features/category_race/CategoryRacePage';
import SidebarLayoutPage from '../features/Sidebar/SidebarLayoutPage';
import AllCategoryRacePage from '../features/category_race/TotalCategoryRacePage';

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
    path="/category/:categoryName"
    element={
    <SidebarLayoutPage>
      <CategoryRacePage />
    </SidebarLayoutPage>
    }
    />
    <Route
    path="/total_category"
    element={
      <SidebarLayoutPage>
        <AllCategoryRacePage />
      </SidebarLayoutPage>
    }
    />
    {/* <Route path="/login" element={<LoginPage />} /> */}
  </Routes>
);
