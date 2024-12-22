import { Routes, Route } from "react-router-dom"; 
import {   Home,
        Notifications, 
        Projects,  
        Reports,  
        Settings,  
        Categories,   
        Stores,   
        Navbar,   
        Signin,   
        SignUp,   
        Logout,
        profile,
       } from "./Components/pageIndex"; 
import {CoreDashboard, FAQ} from "@/Components/compIndex"; 
import "./App.css"; 
const App = () => {   
  return (     <Routes>       
    <Route path="/" element={<Home />} />      
    <Route path="/Home" element={<Home />} />      
    <Route path="/signup" element={<SignUp />} />     
    <Route path="/login" element={<Signin />} />       
    <Route path="/logout" element={<Logout />} />            
    <Route path="/notifications" element={<Notifications />} />    
    <Route path="/reports" element={<Reports />} /> 
    <Route path="/user-profile" element={<profile />} />
    <Route path="/projects" element={<Projects />} />      
    <Route path="/categories" element={<Categories />} />        
    <Route path="/stores" element={<Stores />} />      
    <Route path="/" element={<CoreDashboard />} />        
    <Route path="/faqs" element={<><Navbar/><FAQ /></>} />    
  </Routes>  
         ); 
};  
export default App;
