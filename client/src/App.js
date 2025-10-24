import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Contexts ---
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// --- Common Components ---
import Header from './components/common/Header';

// --- Pages ---
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';

/**
 * A wrapper for routes that should only be accessible to logged-in users.
 * If not logged in, redirects to the /login page.
 */
function ProtectedRoute() {
  const { user, loading } = useAuth(); // Assuming useAuth provides user and a loading state

  if (loading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  // If the user is not logged in, redirect them
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user IS logged in, render the Header and the protected page
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

/**
 * A wrapper for routes that should only be accessible to guests (non-logged-in users).
 * If logged in, redirects to the /dashboard.
 */
function GuestRoute() {
  const { user, loading } = useAuth(); // Assuming useAuth provides user and a loading state

  if (loading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }
  
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    // 1. <Router> must be the OUTERMOST component
    <Router>
      {/* 2. AuthProvider now lives INSIDE Router and can use router hooks */}
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-gray-100">
            {/* Header REMOVED from here. It's now inside ProtectedRoute */}
            <Routes>
              {/* Public Route (No Header) */}
              <Route path="/" element={<LandingPage />} />

              {/* Guest Routes (No Header) */}
              {/* Guest Routes (Only for non-logged-in users) */}
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>

              {/* Protected Routes (These will now render with the Header) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                {/* Add other protected routes here (e.g., profile, transactions) */}
              </Route>

              {/* Optional: A fallback route for 404 Not Found */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
      
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

