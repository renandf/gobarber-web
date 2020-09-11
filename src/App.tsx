import React from 'react';

import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />

    <AuthProvider>
      <Login />
    </AuthProvider>
  </>
);

export default App;
