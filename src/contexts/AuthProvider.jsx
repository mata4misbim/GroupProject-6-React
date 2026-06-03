import { useEffect, useState } from "react";
import { AuthContext, readStoredSession } from "./AuthContext";
import { apiGet, apiPost } from "../lib/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredSession);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      try {
        const response = await apiGet("/auth/me");
        const session = { ...response.data, loggedIn: true };

        if (!cancelled) {
          localStorage.setItem("session", JSON.stringify(session));
          setUser(session);
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem("session");
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async ({ email, password }) => {
    const response = await apiPost("/auth/login", { email, password });
    const session = { ...response.user, loggedIn: true };

    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);

    return session;
  };

  const logout = async () => {
    try {
      await apiPost("/logout");
    } catch {
      // Clear local state even if the server-side cookie is already gone.
    }

    localStorage.removeItem("session");
    setUser(null);
  };  

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
