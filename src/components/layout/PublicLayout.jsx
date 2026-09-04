import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import styles from './PublicLayout.module.css';

function PublicLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      {/* Header overlaid on Hero */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logoImage} alt="MaxValid Logo" className={styles.logoImage} />
            </Link>
          </div>
          
          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="#" className={styles.navLink}>Donate <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="#" className={styles.navLink}>Events</Link>
            <Link to="#" className={styles.navLink}>About Us <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="#" className={styles.navLink}>Gallery</Link>
            <Link to="/news" className={`${styles.navLink} ${styles.active}`}>News & Articles <span className={styles.dropdownIcon}>▼</span></Link>
            <Link to="#" className={styles.navLink}>Partnership</Link>
          </nav>

          <div className={styles.headerActions}>
            <div className={styles.langToggle}>
              <button className={styles.langBtnActive}>EN</button>
              <button className={styles.langBtn}>BN</button>
            </div>
            <button className={styles.signInBtn} onClick={() => navigate('/signin')}>Sign In</button>
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
              <Link to="#">Blog</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Donate</h4>
              <Link to="#">Contact</Link>
              <Link to="#">Blood Donate</Link>
              <Link to="#">Broad Resource</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Others</h4>
              <Link to="#">Contact</Link>
              <Link to="#">Our Work</Link>
              <Link to="#">Our Values</Link>
              <Link to="#">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; 2026 Bandhan Paribar. All rights reserved.
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileBottomNav}>
        <Link to="/" className={styles.bottomNavLink}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </Link>
        <Link to="#" className={styles.bottomNavLink}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M12 12A9 9 0 0 0 3 3h18a9 9 0 0 0-9 9Z"/><path d="m20.6 6.4-1.2-1.2"/><path d="M12 3v3"/><path d="M3.4 6.4 4.6 5.2"/></svg>
        </Link>
        <Link to="#" className={styles.bottomNavLink}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </Link>
        <Link to="#" className={styles.bottomNavLink}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-7.3 7.3a1 1 0 0 1-1.41-1.41l3.35-3.35"/><path d="m20 18-2-2"/><path d="m22 20-2-2"/></svg>
        </Link>
        <Link to="/news" className={`${styles.bottomNavLink} ${styles.activeBottomNav}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          <span>Articles</span>
        </Link>
      </nav>
    </div>
  );
}

export default PublicLayout;
