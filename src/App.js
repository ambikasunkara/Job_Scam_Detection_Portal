import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import Home        from './pages/Home';
import SignIn      from './pages/SignIn';
import SignUp      from './pages/SignUp';
import Dashboard   from './pages/Dashboard';
import AnalyzeJob  from './pages/AnalyzeJob';
import Learn       from './pages/Learn';
import MyAccount   from './pages/MyAccount';
import ReportScam  from './pages/ReportScam';

// Protected Route wrapper
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
        <div className="page-wrap">
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/signin"    element={<SignIn />} />
        <Route path="/signup"    element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/analyze"   element={<PrivateRoute><AnalyzeJob /></PrivateRoute>} />
        <Route path="/learn"     element={<PrivateRoute><Learn /></PrivateRoute>} />
        <Route path="/account"   element={<PrivateRoute><MyAccount /></PrivateRoute>} />
        <Route path="/report"    element={<PrivateRoute><ReportScam /></PrivateRoute>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
