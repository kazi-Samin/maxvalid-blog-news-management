import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../assets/logo.png';
import styles from './SignIn.module.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    // Simulated auth — in production this calls a real API
    setTimeout(() => {
      if (email === 'superadmin@kichukori.com' && password === 'admin123') {
        navigate('/admin/content');
      } else {
        setError('Invalid credentials. Try superadmin@kichukori.com / admin123');
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
        <div className={styles.formBox}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Welcome back 👋</h2>
            <p className={styles.formSub}>Sign in to the Bandhan Paribar admin panel</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email Address</label>
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

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="Enter your password"
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
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.errorMsg} role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className={styles.backLink}>
            <Link to="/">&larr; Back to website</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
