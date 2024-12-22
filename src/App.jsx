/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"; 
import {   Home,
        Notifications, 
        Projects,
        Reports,  
        AccountSetting,  
        Categories,   
        Stores,   
        Navbar,   
        Signin,   
        SignUp,   
        Logout,
       } from "./Components/pageIndex"; 
import {CoreDashboard, FAQ, Footer} from "@/Components/compIndex"; 
import { Profile } from "./Components/pageIndex";
import "./App.css"; 
const App = () => {   
  return (     <Routes>       
    <Route path="/" element={<Home />} />      
    <Route path="/Home" element={<Home />} />      
    <Route path="/signup" element={<SignUp />} />     
    <Route path="/login" element={<Signin />} />       
    <Route path="/logout" element={<Logout />} />       
    <Route path="/userProfile" element={<Profile/>} />      
    <Route path="/notifications" element={<Notifications />} />    
    <Route path="/reports" element={<Reports />} />      
    <Route path="/projects" element={<Projects />} />      
    <Route path="/categories" element={<Categories />} />        
    <Route path="/stores" element={<Stores />} />  
    <Route path="/setting" element={<><AccountSetting/> <Footer/> </>}></Route>    
    <Route path="/" element={<CoreDashboard />} />        
    <Route path="/faqs" element={<><Navbar/><FAQ /></>} />    
  </Routes>  
         ); 
};  
export default App;
