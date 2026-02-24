import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ss_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const signUp = (userData) => {
    const users = JSON.parse(localStorage.getItem('ss_users') || '[]');
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already registered.');
    }
    const newUser = {
      ...userData,
      id: Date.now(),
      joined: new Date().toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' }),
      avatar: userData.name?.[0]?.toUpperCase() || 'U',
    };
    localStorage.setItem('ss_users', JSON.stringify([...users, newUser]));
    localStorage.setItem('ss_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ss_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password.');
    localStorage.setItem('ss_user', JSON.stringify(found));
    setUser(found);
    return found;
  };

  const signOut = () => {
    localStorage.removeItem('ss_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
