import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState("Home");
  return (
    <AppContext.Provider value={{ dashboard, setDashboard }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
