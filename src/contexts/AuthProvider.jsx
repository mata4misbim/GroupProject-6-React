import { useState } from "react";
import { AuthContext, readStoredSession } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredSession);

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
