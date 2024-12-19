import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedIn, setIsLoggedIn] = useState(!!token);
  const [admin, setAdmin] = useState(localStorage.setItem("isAdmin", false));
  const [isAdmin, setIsAdmin] = useState(!!admin);

  const storeIsAdminState = (isAdminState) => {
    const isAdmin = localStorage.setItem(isAdminState);
    setIsAdmin(isAdminState);
  };

  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(token);
    setIsLoggedIn(!!serverToken);
  };

  // Logout function
  const LogoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
  };

  // Store UserId
  const storeUserId = (userId) => {
    localStorage.setItem("userId", userId);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setIsLoggedIn,
        storeTokenInLocalStorage,
        storeIsAdminState,
        LogoutUser,
        storeUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
