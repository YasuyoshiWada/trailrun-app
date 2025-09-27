import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import AppRouterWithDialogs from './AppRouterWithDialog';
import { AuthProvider } from './features/Auth/AuthContext';


const App: React.FC = () => (

  <BrowserRouter>
    <AuthProvider>
      <AppRouterWithDialogs />
    </AuthProvider>
  </BrowserRouter>
  )

export default App;
