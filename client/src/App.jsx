//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Home/Navbar";
import About from "./Components/Home/About";
import Service from "./Components/Home/Service";
import Contact from "./Components/Home/Contact";

import Dashboard from "./Components/admin/Dashboard";
import UHome from "./Components/admin/Home";
import Profile from "./Components/admin/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/service",
        element: <Service/>
      },
      {
        path: "/service",
        element: <Service/>
      },
      {
        path: "/contact",
        element: <Contact/>
      }
    ]
  },

  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {
        index: true,
        element: <UHome/>
      },
      {
        path: "/dashboard/profile",
        element: <Profile/>
      }
    ]
  }
])

const App = ()=>{
  return(
    <>
    <RouterProvider router={router}/>
    </>
  )
}
export default App;