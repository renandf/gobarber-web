import React from 'react';

import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

const App: React.FC = () => (
  <>
    <GlobalStyle />

    <AuthProvider>
      <Login />
    </AuthProvider>

    <ToastContainer />
  </>
);

export default App;
