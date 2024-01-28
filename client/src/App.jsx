import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Home/Navbar";
import About from "./Components/Home/About";
import Service from "./Components/Home/Service";
import Contact from "./Components/Home/Contact";
const App = ()=>{
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}
export default App;