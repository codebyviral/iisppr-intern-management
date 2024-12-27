import { createContext, useState, useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState("Home");
  const [notiCounter, setNotiCounter] = useState(0);
  const [modalView, setModalView] = useState(false);
  const [username, setUsername] = useState("");

  const storeUsername = (name) => {
    localStorage.setItem("userName", name);
    setUsername(name);
  };

  return (
    <AppContext.Provider
      value={{
        dashboard,
        notiCounter,
        storeUsername,
        setDashboard,
        setNotiCounter,
        modalView,
        setModalView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
