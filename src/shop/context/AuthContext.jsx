import { createContext, useContext, useState, useEffect } from "react";
import { apiPost } from "../../lib/api";

const AuthContext = createContext(null);

const buildRegisterRequest = (userData = {}) => {
  if (userData.role === "artist") {
    return {
      path: "/auth/register/artist",
      body: {
        display_name: userData.artistName,
        username: userData.username,
        email: userData.email,
        genre: userData.genre,
        password: userData.password,
      },
    };
  }

  return {
    path: "/auth/register/fan",
    body: {
      username: userData.username,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      password: userData.password,
    },
  };
};

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
    const { path, body } = buildRegisterRequest(userData);
    return apiPost(path, body);
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
