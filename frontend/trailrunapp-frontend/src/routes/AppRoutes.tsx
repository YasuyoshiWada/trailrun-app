// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../features/dashboard/DashboardPage';
import CategoryRacePage from '../features/category_race/CategoryRacePage';
import SidebarLayoutPage from '../features/Sidebar/SidebarLayoutPage';
import TotalCategoryRacePage from '../features/category_race/TotalCategoryRacePage';
import AdminLogin from '../features/Auth/AdminLogin';
import StaffLogin from '../features/Auth/StaffLogin';
import ChatPage from '../features/chat/ChatPage';
import { rooms } from '../data/rooms';
import ProtectedRoute from './ProtectedRoute';



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
      <ProtectedRoute>
        <SidebarLayoutPage> {/* //outerScrollはSidebarLayoutPageで定義している、overflowYの事 */}
          <DashboardPage />
        </SidebarLayoutPage>
      </ProtectedRoute>

    }
    />
    <Route
    path="/category/:categoryName"
    element={
      <ProtectedRoute>
        <SidebarLayoutPage>
          <CategoryRacePage />
        </SidebarLayoutPage>
      </ProtectedRoute>
    }
    />
    <Route
    path="/category/:categoryName/status/:label"
    element={
      <ProtectedRoute>
        <SidebarLayoutPage>
          <CategoryRacePage />
        </SidebarLayoutPage>
      </ProtectedRoute>
    }
    />
    <Route
    path="/total_category"
    element={
      <ProtectedRoute>
        <SidebarLayoutPage>
          <TotalCategoryRacePage />
        </SidebarLayoutPage>
      </ProtectedRoute>
    }
    />
    <Route
    path="/total_category/status/:label"
    element={
      <ProtectedRoute>
        <SidebarLayoutPage>
          <TotalCategoryRacePage />
        </SidebarLayoutPage>
      </ProtectedRoute>
    }
    />
    <Route
    path="/chat/:roomId?"
    element={
      <ProtectedRoute>
        <SidebarLayoutPage>
          <ChatPage rooms={rooms} />
        </SidebarLayoutPage>
      </ProtectedRoute>
    }
    />
    <Route
    path="/start-time"
    element={
      <ProtectedRoute>
        <SidebarLayoutPage>

        </SidebarLayoutPage>
      </ProtectedRoute>
    }
    />
  </Routes>
);
