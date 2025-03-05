import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import store from './store/store';
import {Provider} from 'react-redux';

import { AuthProvider, useAuth } from './auth/AuthContext';

import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';

import HomePage from './components/pages/Home';
import StudentPage from './components/pages/StudentPage';

import { getThemeForRoles } from './components/theme/theme';

// Main App Component
const App: React.FC = () => {
  const theme = getThemeForRoles([]); // Replace with your role-based theme logic

  // Wrap the whole app in Redux Provider so all components can access the store.
  // Wrap the whole app in AuthProvider, custom context provider to handle authentication state.
  //
  return (
    <Provider store={store}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
    </Provider>
  );
};

// Separate component to define routes
// This allows useAuth to work, since it's now inside the AuthProvider
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <SignupPage />} />

      {/* Private Routes (only show if authenticated) */}
      {isAuthenticated ? (
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="*" element={<Navigate to="/home" />} /> 
        </>
      ) : (
        <>
          {/* Redirect any unknown routes to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
