import { createContext, useState, useContext } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState("Home");
  const [notiCounter, setNotiCounter] = useState(0);
  return (
    <AppContext.Provider
      value={{ dashboard, notiCounter, setDashboard, setNotiCounter }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
