import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutGrid, Users, FileText, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../assets/logo.png';
import styles from './AdminLayout.module.css';

function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to="/" title="Go to main website">
            <img src={logoImage} alt="Bandhan Paribar Logo" className={styles.logo} />
          </Link>
        </div>

        <nav className={styles.navMenu}>
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
          >
            <LayoutGrid size={20} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
          >
            <Users size={20} />
            <span>User Management</span>
          </NavLink>
          
          <NavLink 
            to="/admin/blog-news" 
            className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
          >
            <FileText size={20} />
            <span>Blog & News Management</span>
          </NavLink>
          
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
          >
            <Settings size={20} />
            <span>Setting Management</span>
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <User size={24} />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user?.name || 'Super Admin'}</p>
              <p className={styles.userEmail}>{user?.email || 'superadmin@kichukori.com'}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
