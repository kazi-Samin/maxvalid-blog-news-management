import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Simulated auth validation
    if (email === 'superadmin@kichukori.com' && password === 'admin123') {
      const userData = {
        name: 'Super Admin',
        email: 'superadmin@kichukori.com',
        role: 'Admin'
      };
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Use superadmin@kichukori.com / admin123' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
