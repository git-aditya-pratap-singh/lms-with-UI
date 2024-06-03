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

import ProctedRouteGuard from "./app/_guard/route.guard";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => {
          console.log("Api Call")
          return null
        }
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/service",
        element: <Service />
      },
      {
        path: "/service",
        element: <Service />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  },
  // {
  //   // Catch-all route for 404 errors
  //   path: "/dashboard",
  //   element: <h1>NOT FOUND-1!!</h1>
  // },

  {
    path: "/",
    element: (
      <ProctedRouteGuard>
        <Dashboard />
      </ProctedRouteGuard>
    ),
    children: [
      {
        index: true,
        path: "/dashboard/home",
        element: <UHome />
      },
      {
        path: "/dashboard/profile",
        element: <Profile />
      },
      {
        path: "/dashboard/students",
        element: <Students />
      },
      {
        path: "/dashboard/teachers",
        element: <Teachers />
      },
      {
        path: "/dashboard/course",
        element: <Course />
      },
      {
        path: "/dashboard/registration",
        element: <Registration />
      }
    ]
  },
  {
    // Catch-all route for 404 errors
    path: "*",
    element: <h1>NOT FOUND!!</h1>
  },

])

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />

      <RouterProvider router={router} />
    </>
  )
}
export default App;