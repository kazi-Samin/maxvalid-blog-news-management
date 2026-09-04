import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../assets/logo.png';
import styles from './PublicLayout.module.css';

function PublicLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className={styles.layout}>
      {/* Header overlaid on Hero */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logoImage} alt="Bandhan Paribar Logo" className={styles.logoImage} />
            </Link>
          </div>
          
          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="#" className={styles.navLink}>Donate <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="#" className={styles.navLink}>Events</Link>
            <Link to="#" className={styles.navLink}>About Us <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="#" className={styles.navLink}>Gallery</Link>
            <Link to="/" className={`${styles.navLink} ${styles.active}`}>News & Articles <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="#" className={styles.navLink}>Partnership</Link>
          </nav>

          <div className={styles.headerActions}>
            <div className={styles.langToggle}>
              <button className={styles.langBtnActive}>EN</button>
              <button className={styles.langBtn}>BN</button>
            </div>

            {isAuthenticated ? (
              <>
                <button className={styles.signInBtn} onClick={() => navigate('/admin/blog-news')}>
                  Dashboard
                </button>
                <button
                  className={styles.signInBtn}
                  style={{ background: '#dc3545', color: '#fff', marginLeft: '6px' }}
                  onClick={logout}
                >
                  Log Out
                </button>
              </>
            ) : (
              <button className={styles.signInBtn} onClick={() => navigate('/signin')}>
                Sign In
              </button>
            )}

            <button className={styles.donateBtn}>Donate</button>
            
            <button 
              className={styles.mobileMenuBtn} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <img src={logoImage} alt="Logo" className={styles.footerLogo} />
            <p>This institution is striving to build an ideal welfare society by following the footsteps of the Prophet of Humanity, the Messenger of Human Freedom and Peace, the ideal of human service, the Prophet Muhammad (PBUH), in the service of humanity.</p>
          </div>
          
          <div className={styles.footerLinksGroup}>
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <Link to="/">Home</Link>
              <Link to="#">About Us</Link>
              <Link to="#">Our Work</Link>
              <Link to="#">Gallery</Link>
              <Link to="/">Blog</Link>
            </div>
            
            <div className={styles.footerCol}>
              <h4>Donate</h4>
              <Link to="#">Orphan Support</Link>
              <Link to="#">Disaster Relief</Link>
              <Link to="#">Zakat</Link>
              <Link to="#">Education</Link>
            </div>

            <div className={styles.footerCol}>
              <h4>Others</h4>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Service</Link>
              <Link to="#">Contact Us</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          &copy; 2026 Bandhan Paribar. All rights reserved.
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Figma spec) */}
      <nav className={styles.mobileBottomNav} aria-label="Mobile Navigation">
        <Link to="/" className={`${styles.mobileNavItem} ${styles.mobileNavActive}`}>
          <span className={styles.mobileNavIcon}>🏠</span>
          <span>Home</span>
        </Link>
        <Link to="#" className={styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>💚</span>
          <span>Donate</span>
        </Link>
        <Link to="#" className={styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>🔔</span>
          <span>Alerts</span>
        </Link>
        <Link to="#" className={styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>🤝</span>
          <span>Partner</span>
        </Link>
        <Link to="/" className={styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>📰</span>
          <span>Articles</span>
        </Link>
      </nav>
    </div>
  );
}

export default PublicLayout;
