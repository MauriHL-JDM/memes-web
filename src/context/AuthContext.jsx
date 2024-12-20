import { createContext, useState } from "react";
import { login } from "../services/memes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(() => {
    const savedCredentials = localStorage.getItem("credentials");
    return savedCredentials ? JSON.parse(savedCredentials) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("isAuthenticated"))
  );

  const loginUser = async (username, password) => {
    const [creds, error] = await login(username, password);
    if (error) {
      setIsAuthenticated(false);
      return false;
    }

    setCredentials(creds);
    setIsAuthenticated(true);
    localStorage.setItem("credentials", JSON.stringify(creds));
    localStorage.setItem("isAuthenticated", true);

    return true;
  };

  const logoutUser = () => {
    setCredentials(null);
    setIsAuthenticated(false);
    localStorage.removeItem("credentials");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ credentials, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
