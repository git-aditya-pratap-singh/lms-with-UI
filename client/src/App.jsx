import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Home/Navbar";
import About from "./Components/Home/About";
import Service from "./Components/Home/Service";
import Contact from "./Components/Home/Contact";

import Dashboard from "./Components/admin/Dashboard";
import Home_admin from "./Components/admin/Home_admin";
import Profile_admin from "./Components/admin/Profile";

const App = ()=>{
  return(
    <>
    <BrowserRouter>
    <Routes>
      {/* Main Layout */}
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Route>
      
      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<Home_admin/>}/>
        <Route path="/dashboard/profile" element={<Profile_admin/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>
    
    </>
  )
}
export default App;