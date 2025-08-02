// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
// import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import CategoryRacePage from '../features/category_race/CategoryRacePage';
import SidebarLayoutPage from '../features/Sidebar/SidebarLayoutPage';
import TotalCategoryRacePage from '../features/category_race/TotalCategoryRacePage';

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
    path="/category/:categoryName/status/:label"
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
        <TotalCategoryRacePage />
      </SidebarLayoutPage>
    }
    />
    <Route
    path="/total_category/status/:label"
    element={
      <SidebarLayoutPage>
        <TotalCategoryRacePage />
      </SidebarLayoutPage>
    }
    />
    {/* <Route path="/login" element={<LoginPage />} /> */}
  </Routes>
);
