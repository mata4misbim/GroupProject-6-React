import { createContext } from "react";

export const AuthContext = createContext(null);

export function readStoredSession() {
  try {
    const saved = localStorage.getItem("session");
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    return parsed.loggedIn ? parsed : null;
  } catch {
    localStorage.removeItem("session");
    return null;
  }
}
