import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AppRoutes } from './routes/AppRoutes';


const App: React.FC = () => {
  return(
      <BrowserRouter>
        <div style={{ display: 'flex'}}>
          <Sidebar />
          <div style={{ flexGrow: 1, padding: '1rem' }}>
              <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
  );
};

export default App;
