import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';


const App: React.FC = () => {
  return(
      <Router>
        <div style={{ display: 'flex'}}>
          <Sidebar />
          <div style={{ flexGrow: 1, padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
        <Dashboard />;
      </Router>
  );
};

export default App;
