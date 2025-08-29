import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiSignIn, apiMe, apiSignOut } from '@/lib/api';

interface User {
  id: string;
  email: string;
}

interface Profile {
  id: number;
  company_id: number;
  name: string;
  role: 'admin' | 'staff';
  status: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!profile;
  
  // Debug da condição de autenticação
  console.log('🔍 DEBUG: Estado de autenticação:', { 
    user, 
    profile, 
    isAuthenticated, 
    loading 
  });

  const refreshUser = async () => {
    try {
      console.log('🔍 DEBUG: Chamando apiMe()...');
      const { user: userData, profile: profileData } = await apiMe();
      console.log('🔍 DEBUG: Resposta apiMe():', { userData, profileData });
      
      // Validação mais robusta
      if (!userData || !userData.id || !profileData || !profileData.company_id) {
        console.log('🔍 DEBUG: Dados inválidos recebidos, limpando estado');
        clearAuthState();
        return;
      }
      
      setUser(userData);
      setProfile(profileData);
    } catch (error) {
      console.log('🔍 DEBUG: Erro no apiMe():', error);
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Fazer login no backend
      console.log('🔍 DEBUG: Fazendo login...');
      const response = await apiSignIn(email, password);
      console.log('🔍 DEBUG: Resposta login:', response);
      
      // Se o login retornar profile, usar diretamente
      if (response.profile) {
        console.log('🔍 DEBUG: Profile encontrado, usando diretamente');
        setUser(response.user);
        setProfile(response.profile);
        return;
      }
      
      // Caso contrário, buscar dados do usuário (fallback)
      console.log('🔍 DEBUG: Profile não encontrado, chamando refreshUser');
      await refreshUser();
    } catch (error) {
      console.log('🔍 DEBUG: Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiSignOut();
    } finally {
      setUser(null);
      setProfile(null);
      // Limpar cookies manualmente também
      document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  };

  // Função para limpar estado completamente
  const clearAuthState = () => {
    setUser(null);
    setProfile(null);
    setLoading(false);
    // Limpar cookies
    document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    clearAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
