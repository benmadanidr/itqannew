import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  isProfileComplete: boolean;
  profileData?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string, isNewUser?: boolean) => void;
  logout: () => void;
  completeProfile: (data: any) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: string, isNewUser: boolean = false) => {
    const mockUser: User = {
      id: '1',
      name: role === 'student' ? 'طالب جديد' : role === 'teacher' ? 'أستاذ جديد' : 'مدير النظام',
      email,
      role: role as 'student' | 'teacher' | 'admin',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100.png',
      isProfileComplete: role === 'admin' ? true : !isNewUser,
    };
    setUser(mockUser);
  };

  const completeProfile = (data: any) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return {
        ...currentUser,
        name: data.name,
        avatar: data.avatar,
        isProfileComplete: true,
        profileData: data,
      };
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, completeProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
