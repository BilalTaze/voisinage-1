
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { userService, User } from '../services/localStorageService';

type UserWithoutPassword = Omit<User, 'password'>;

interface AuthContextType {
  user: UserWithoutPassword | null;
  login: (email: string, password: string) => Promise<UserWithoutPassword>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<UserWithoutPassword>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si un utilisateur est déjà connecté au chargement
  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  // Connexion
  const login = async (email: string, password: string): Promise<UserWithoutPassword> => {
    try {
      const loggedUser = userService.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } catch (error) {
      throw error;
    }
  };

  // Inscription
  const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<UserWithoutPassword> => {
    try {
      const newUser = userService.createUser(userData);
      setUser(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // Déconnexion
  const logout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
