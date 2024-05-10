//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
        
import Home from "./app/pages/Home/Home";
import Navbar from "./app/pages/Home/Navbar";
import About from "./app/pages/Home/About";
import Service from "./app/pages/Home/Service";
import Contact from "./app/pages/Home/Contact";

import Dashboard from "./app/pages/admin/layout/Dashboard";
import UHome from "./app/pages/admin/Home";
import Profile from "./app/pages/admin/Profile";
import Students from "./app/pages/admin/Students";
import Teachers from "./app/pages/admin/Teachers";
import Course from "./app/pages/admin/Courses";
import Registration from "./app/pages/admin/Registration";

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
      },
      {
        path: "/dashboard/students",
        element: <Students/>
      },
      {
        path: "/dashboard/teachers",
        element: <Teachers/>
      },
      {
        path: "/dashboard/course",
        element: <Course/>
      },
      {
        path: "/dashboard/registration",
        element: <Registration/>
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