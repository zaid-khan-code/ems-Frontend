import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService.js";

// the "global store" — any component can access this
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // holds logged in user info or null if not logged in
  const [user, setUser] = useState(null);

  // prevents flickering on page refresh
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // on app load → check if user was already logged in
    // (restores state after page refresh)
    const savedUser = authService.getUser();
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // hit backend → get token + user
    const data = await authService.login(username, password);

    // save to localStorage so refresh doesn't log out
    authService.saveSession(data.token, data.user);

    // update state → whole app knows user is logged in
    setUser(data.user);
  };

  const logout = () => {
    authService.logout(); // clears localStorage
    setUser(null); // clears state
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook so any component accesses auth in one line
export const useAuth = () => useContext(AuthContext);
