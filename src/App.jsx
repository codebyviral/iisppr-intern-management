/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"; 
import {   Home,Notifications, Projects,Reports,  AccountSetting, Stores,   Navbar,   Signin,   SignUp,   Logout,Aboutus,Privacypolicy,AdminHomePage,AdminProject,AdminTask,AdminReport,Help,AllUsers,AdminHelpPage} from "./Components/pageIndex"; 
import {CoreDashboard, FAQ, Footer} from "@/Components/compIndex"; 
import { Profile } from "./Components/pageIndex";
import "./App.css"; 
const App = () => {   
  return (    
     <Routes>       
    <Route path="/" element={<Home />} />      
    <Route path="/signup" element={<SignUp />} />     
    <Route path="/login" element={<Signin />} />       
    <Route path="/logout" element={<Logout />} />       
    <Route path="/userProfile" element={<><Profile/></>} />      
    <Route path="/notifications" element={<Notifications />} />    
    <Route path="/reports" element={<Reports />} /> 
    <Route path="/projects" element={<Projects />} />  
    <Route path="/aboutus" element={<><Aboutus/><Footer/></>}/>  
    <Route path="/privacypolicy" element={<><Privacypolicy/><Footer/> </>}></Route>
   <Route path="/help" element={<Help/>}></Route>
  
    <Route path="/stores" element={<Stores />} />  
    <Route path="/setting" element={<><AccountSetting/> <Footer/> </>}></Route>    
    <Route path="/" element={<CoreDashboard />} />        
    <Route path="/faqs" element={<><Navbar/><FAQ /></>} />   

    <Route path="/Adminhomepage" element={<AdminHomePage/>}></Route>
    <Route path="/Projectmanagement" element={<AdminProject/>}></Route>
    <Route path="/Admintask" element={<AdminTask/>}></Route>
    <Route path="/Weeklyreport" element={<AdminReport/>}></Route>
    <Route path="/Taskassignment" element={<AdminTask/>}></Route>
    <Route path="/allusers" element={<AllUsers/>}></Route>
    <Route path="/adminhelppage" element={<AdminHelpPage/>}></Route>
  </Routes>  
         ); 
};  
export default App;
