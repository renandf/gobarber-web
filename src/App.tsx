import React from 'react';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Login />
  </>
);

export default App;
