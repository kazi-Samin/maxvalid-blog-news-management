import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import PublicNews from './pages/PublicNews';
import SignIn from './pages/SignIn';
import AdminDashboardList from './pages/AdminDashboardList';
import AdminDashboardCreate from './pages/AdminDashboardCreate';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<PublicNews />} />
        <Route path="news" element={<Navigate to="/" replace />} />
      </Route>

      {/* Sign In */}
      <Route path="/signin" element={<SignIn />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/content" replace />} />
        <Route path="content" element={<AdminDashboardList />} />
        <Route path="content/create" element={<AdminDashboardCreate />} />
        {/* Placeholder routes for other nav items */}
        <Route path="dashboard" element={<AdminDashboardList />} />
        <Route path="users" element={<AdminDashboardList />} />
        <Route path="settings" element={<AdminDashboardList />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
