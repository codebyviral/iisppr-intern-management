import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";


createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Analytics />
          <Toaster />
          <App />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  </>
);
