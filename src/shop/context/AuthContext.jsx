import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // โหลด session จาก localStorage ตอน mount
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

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
