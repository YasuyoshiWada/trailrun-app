import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import AppRouterWithDialogs from './AppRouterWithDialog';


const App: React.FC = () => (

  <BrowserRouter>
    <AppRouterWithDialogs />
  </BrowserRouter>
  )

export default App;
