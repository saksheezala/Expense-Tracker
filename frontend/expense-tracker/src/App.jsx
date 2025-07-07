import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/dashboard/Home';
import Income from './pages/dashboard/Income';
import Expense from './pages/dashboard/Expense';
import UserProvider from './context/UserContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </Router>

    <Toaster
      toastOptions={{
        className: '',
        style: {
         fontSize: '13px',
        },
      }}
    />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check for token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //if token exists, redirect to dashboard else redirect to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
