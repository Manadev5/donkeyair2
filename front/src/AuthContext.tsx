import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let logoutTimer: ReturnType<typeof setTimeout>; // timer global

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token &&  token.split('.').length === 3) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const isExpired = expirationTime < Date.now();

      if (isExpired) {
        logout();
      } else {
        setIsAuthenticated(true);
        // Déconnexion auto programmée
        const timeout = expirationTime - Date.now();
        logoutTimer = setTimeout(logout, timeout);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const timeout = expirationTime - Date.now();

    logoutTimer = setTimeout(logout, timeout); // auto logout
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    clearTimeout(logoutTimer); // annuler le timer si déjà actif
    alert("Vous avez été déconnecté.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
