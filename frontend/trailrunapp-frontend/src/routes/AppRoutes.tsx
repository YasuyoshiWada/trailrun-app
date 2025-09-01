// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../features/dashboard/DashboardPage';
import CategoryRacePage from '../features/category_race/CategoryRacePage';
import SidebarLayoutPage from '../features/Sidebar/SidebarLayoutPage';
import TotalCategoryRacePage from '../features/category_race/TotalCategoryRacePage';
import AdminLogin from '../features/Auth/AdminLogin';
import StaffLogin from '../features/Auth/StaffLogin';
import ChatPage from '../features/chat/ChatPage';



export const AppRoutes = () => (
  <Routes>
    <Route
    path="/login/admin"
    element={
      <AdminLogin />
    }
    />
    <Route
    path="/login/staff"
    element={
      <StaffLogin />
    }
    />
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
    <Route
    path="/chat"
    element={
      <SidebarLayoutPage>
        <ChatPage />
      </SidebarLayoutPage>
    }
    />
    <Route
    path="/start-time"
    element={
      <SidebarLayoutPage>

      </SidebarLayoutPage>
    }
    />
  </Routes>
);
