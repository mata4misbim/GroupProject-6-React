import { createContext, useContext, useState, useEffect } from "react";
import { apiPost } from "../../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.loggedIn) setUser(parsed);
      }
    } catch {
      localStorage.removeItem("session");
    }
  }, []);

  const login = (userData) => {
    const session = { ...userData, loggedIn: true };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);
  };

  const register = async (userData) => {
    const data = await apiPost("/auth/register/fan", userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
