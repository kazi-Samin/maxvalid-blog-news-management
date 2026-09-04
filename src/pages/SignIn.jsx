import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/logo.png';
import styles from './SignIn.module.css';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin/content';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className={styles.page}>
      {/* Left panel - branding */}
      <div className={styles.leftPanel}>
        <div className={styles.brandContent}>
          <img src={logoImage} alt="Bandhan Paribar Logo" className={styles.brandLogo} />
          <h1 className={styles.brandTitle}>Bandhan Paribar</h1>
          <p className={styles.brandSub}>Blog &amp; News Management System</p>
          <div className={styles.brandDecor} />
          <p className={styles.brandQuote}>
            Striving to build an ideal welfare society
            in service of humanity.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.backLinkWrapper}>
            <Link to="/" className={styles.backLink}>
              &larr; Back to Website
            </Link>
          </div>

          <h2 className={styles.formTitle}>Welcome back</h2>
          <p className={styles.formSub}>Sign in to the Bandhan Paribar admin panel</p>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="superadmin@kichukori.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.hintBox}>
              <small>Demo Admin Credential: <strong>superadmin@kichukori.com</strong> / <strong>admin123</strong></small>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
