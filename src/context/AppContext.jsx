import { createContext, useState, useContext } from "react";
import { tasks } from "@/APIs";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState("Home");
  const [notiCounter, setNotiCounter] = useState(tasks.length);
  return (
    <AppContext.Provider value={{ dashboard, notiCounter, setDashboard }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
