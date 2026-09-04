import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import PublicNews from './pages/PublicNews';
import SignIn from './pages/SignIn';
import AdminDashboardList from './pages/AdminDashboardList';
import AdminDashboardCreate from './pages/AdminDashboardCreate';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<PublicNews />} />
          <Route path="news" element={<Navigate to="/" replace />} />
        </Route>

        {/* Sign In */}
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Dashboard Routes - Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/blog-news" replace />} />
          <Route path="blog-news" element={<AdminDashboardList />} />
          <Route path="blog-news/create" element={<AdminDashboardCreate />} />
          
          {/* Aliases for backwards compatibility & full route coverage */}
          <Route path="content" element={<Navigate to="/admin/blog-news" replace />} />
          <Route path="content/create" element={<Navigate to="/admin/blog-news/create" replace />} />
          
          {/* Placeholder routes for navigation items */}
          <Route path="dashboard" element={<AdminDashboardList />} />
          <Route path="users" element={<AdminDashboardList />} />
          <Route path="settings" element={<AdminDashboardList />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
