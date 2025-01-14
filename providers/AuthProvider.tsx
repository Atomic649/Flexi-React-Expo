import { createContext, useContext, useEffect, useState } from 'react';
import CallAPIUser from '@/api/auth_api';
import { saveToken,  removeToken } from '@/utils/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { id } from 'date-fns/locale';



// Define the AuthContextType
type AuthContextType = {
  session: JSON | null; // Update the type according to your backend response
  loading: boolean; // Loading state for session
  login: (email: string, password: string) => Promise<any>; // Login function
  logout: () => void; // Logout function
};

// Create Context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

// Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any | null>(null); // Update the type according to your backend response
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check Session when the app starts
    const fetchSession = async () => {
      try {
        const data = await CallAPIUser.getSessionAPI(); 
        setSession(data.session);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Listen to authentication state changes
    CallAPIUser.onAuthStateChange((newSession) => {
      setSession(newSession);
      setLoading(false);
    });
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await CallAPIUser.loginAPI({ email, password });
        setSession(data.session);
      await saveToken(data.token); // Save the token
      await AsyncStorage.setItem('isLoggedIn', 'true'); // Save login status      
      await AsyncStorage.setItem("token", "token");
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setSession(null);
    await removeToken(); // Remove the token
    await AsyncStorage.setItem('isLoggedIn', 'false'); // Save logout status
  };

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to access Auth State
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};