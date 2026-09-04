import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import PublicNews from './pages/PublicNews';
import SignIn from './pages/SignIn';
import AdminDashboardList from './pages/AdminDashboardList';
import AdminDashboardCreate from './pages/AdminDashboardCreate';
import PlaceholderPage from './pages/PlaceholderPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<PublicNews />} />
          <Route path="news" element={<PublicNews />} />
          
          {/* Public Placeholder Routes */}
          <Route path="donate" element={<PlaceholderPage title="Donate" description="Support our welfare projects, orphan care, and emergency disaster relief initiatives." />} />
          <Route path="events" element={<PlaceholderPage title="Events" description="Explore upcoming community health camps, imam training programs, and relief drives." />} />
          <Route path="about" element={<PlaceholderPage title="About Us" description="Learn about Bandhan Paribar's mission, values, and community welfare initiatives." />} />
          <Route path="gallery" element={<PlaceholderPage title="Gallery & Media" description="Browse photo galleries and media coverage of our relief distribution projects." />} />
          <Route path="partnership" element={<PlaceholderPage title="Partnership" description="Collaborate with Bandhan Paribar on humanitarian aid and social development projects." />} />
          <Route path="blood-donate" element={<PlaceholderPage title="Blood Donation" description="Register as a blood donor or support local blood drives." />} />
          <Route path="blood-request" element={<PlaceholderPage title="Blood Request" description="Submit emergency blood requests for patients in medical need." />} />
          <Route path="our-work" element={<PlaceholderPage title="Our Work" description="Explore detailed impact reports from our social welfare programs." />} />
          <Route path="terms" element={<PlaceholderPage title="Terms of Conditions" description="Read our platform terms of service and user agreements." />} />
          <Route path="privacy" element={<PlaceholderPage title="Privacy Policy" description="Learn how we protect and manage user data and privacy." />} />
          <Route path="contact" element={<PlaceholderPage title="Contact Us" description="Get in touch with the Bandhan Paribar team." />} />
        </Route>

        {/* Sign In Route */}
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
          <Route path="dashboard" element={<PlaceholderPage title="Admin Dashboard Overview" description="Summary metrics and analytics overview for system administrators." />} />
          <Route path="users" element={<PlaceholderPage title="User Management" description="Manage super admin accounts, roles, and administrative permissions." />} />
          <Route path="settings" element={<PlaceholderPage title="Setting Management" description="Configure platform system settings, email notifications, and metadata." />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
