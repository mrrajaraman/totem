import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ARENA_DIRECTOR' | 'OPERATIONS_MANAGER';
  avatarUrl?: string;
  lastLogin: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => void;
  logout: () => void;
}

const STORAGE_KEY = 'totem_admin_auth_v1';

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr_totem_hq_001',
  name: 'Arena Director',
  email: 'admin@totemvr.in',
  role: 'SUPER_ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  lastLogin: new Date().toISOString(),
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse admin session', e);
    }
    return null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Standard high-level administrative credentials
    if (
      (cleanEmail === 'admin@totemvr.in' && (cleanPass === 'totem2026' || cleanPass === 'admin123')) ||
      (cleanEmail === 'totem' && cleanPass === 'totem2026') ||
      (cleanEmail === 'operations@totemvr.in' && cleanPass === 'arena2026')
    ) {
      const sessionUser: AdminUser = {
        id: 'usr_totem_hq_001',
        name: cleanEmail.includes('operations') ? 'Ops Commander' : 'Arena Director',
        email: cleanEmail.includes('@') ? cleanEmail : 'admin@totemvr.in',
        role: cleanEmail.includes('operations') ? 'OPERATIONS_MANAGER' : 'SUPER_ADMIN',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        lastLogin: new Date().toISOString(),
      };

      setUser(sessionUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrative credentials. Use admin@totemvr.in / totem2026 or click Instant Demo Access.',
    };
  };

  const loginAsDemo = () => {
    setUser(DEFAULT_ADMIN);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, loginAsDemo, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
