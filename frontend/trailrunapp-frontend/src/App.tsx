import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { AppRoutes } from './routes/AppRoutes';


const App: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <AppRoutes />
    </Layout>
  </BrowserRouter>
);

export default App;
