import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../assets/logo.png';
import styles from './PublicLayout.module.css';

function PublicLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className={styles.layout}>
      {/* Floating pill navbar — transparent frosted glass over hero background across all pages */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logoImage} alt="Bandhan Paribar Logo" className={styles.logoImage} />
            </Link>
          </div>
          
          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
            <Link to="/" className={location.pathname === '/' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Home</Link>
            <Link to="/donate" className={location.pathname === '/donate' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Donate <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="/events" className={location.pathname === '/events' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Events</Link>
            <Link to="/about" className={location.pathname === '/about' ? `${styles.navLink} ${styles.active}` : styles.navLink}>About Us <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="/gallery" className={location.pathname === '/gallery' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Gallery</Link>
            <Link to="/news" className={location.pathname === '/news' ? `${styles.navLink} ${styles.active}` : styles.navLink}>News &amp; Articles <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="/partnership" className={location.pathname === '/partnership' ? `${styles.navLink} ${styles.active}` : styles.navLink}>Partnership</Link>
          </nav>

          <div className={styles.headerActions}>
            <div className={styles.langToggle}>
              <button
                className={lang === 'EN' ? styles.langBtnActive : styles.langBtn}
                onClick={() => setLang('EN')}
              >
                EN
              </button>
              <button
                className={lang === 'BN' ? styles.langBtnActive : styles.langBtn}
                onClick={() => setLang('BN')}
              >
                BN
              </button>
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

            <button className={styles.donateBtn} onClick={() => navigate('/donate')}>Donate</button>
            
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
              <Link to="/about">About Us</Link>
              <Link to="/our-work">Our Work</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/news">Blog</Link>
            </div>
            
            <div className={styles.footerCol}>
              <h4>Donate</h4>
              <Link to="/donate">Donate</Link>
              <Link to="/blood-donate">Blood Donate</Link>
              <Link to="/blood-request">Blood Request</Link>
            </div>

            <div className={styles.footerCol}>
              <h4>Others</h4>
              <Link to="/contact">Contact</Link>
              <Link to="/terms">Terms of Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          &copy; 2026 Bandhan Paribar. All rights reserved.
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Figma spec) */}
      <nav className={styles.mobileBottomNav} aria-label="Mobile Navigation">
        <Link to="/" className={location.pathname === '/' ? `${styles.mobileNavItem} ${styles.mobileNavActive}` : styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/donate" className={location.pathname === '/donate' ? `${styles.mobileNavItem} ${styles.mobileNavActive}` : styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>💚</span>
          <span>Donate</span>
        </Link>
        <Link to="/events" className={location.pathname === '/events' ? `${styles.mobileNavItem} ${styles.mobileNavActive}` : styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>🔔</span>
          <span>Alerts</span>
        </Link>
        <Link to="/partnership" className={location.pathname === '/partnership' ? `${styles.mobileNavItem} ${styles.mobileNavActive}` : styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>🤝</span>
          <span>Partner</span>
        </Link>
        <Link to="/news" className={location.pathname === '/news' ? `${styles.mobileNavItem} ${styles.mobileNavActive}` : styles.mobileNavItem}>
          <span className={styles.mobileNavIcon}>📰</span>
          <span>Articles</span>
        </Link>
      </nav>
    </div>
  );
}

export default PublicLayout;
