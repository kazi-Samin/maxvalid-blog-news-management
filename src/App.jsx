import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import PublicNews from './pages/PublicNews';
import AdminDashboardList from './pages/AdminDashboardList';
import AdminDashboardCreate from './pages/AdminDashboardCreate';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<PublicNews />} />
        <Route path="news" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/content" replace />} />
        <Route path="content" element={<AdminDashboardList />} />
        <Route path="content/create" element={<AdminDashboardCreate />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
