import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './store/slices/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  
  if (token && user) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in and get profile
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, token, user]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={
              token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            } 
          />
          
          {/* Catch all route */}
          <Route 
            path="*" 
            element={<Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
