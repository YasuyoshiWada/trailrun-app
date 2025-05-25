import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import SidebarLayoutPage from './features/Sidebar/SidebarLayoutPage';
import { AppRoutes } from './routes/AppRoutes';


const App: React.FC = () => (
  <BrowserRouter>
    <SidebarLayoutPage>
      <AppRoutes />
    </SidebarLayoutPage>
  </BrowserRouter>
);

export default App;
