import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Navbar from "../pages/Home/Navbar";
import About from "../pages/Home/About";
import Service from "../pages/Home/Service";
import Contact from "../pages/Home/Contact";

import Dashboard from "../pages/admin/layout/Dashboard";
import UHome from "../pages/admin/Home";
import Profile from "../pages/admin/Profile";
import Students from "../pages/admin/Students";
import Teachers from "../pages/admin/Teachers";
import Course from "../pages/admin/Courses";
import Registration from "../pages/admin/Registration";

import { ProctedRouteGuard } from "../_guard/route.guard";

const homeLoader = async () => {
    console.log("HIII")
    // const response = await fetch('/api/home-data');
    // if (!response.ok) {
    //   throw new Error('Failed to fetch home data');
    // }
    // const data = await response.json();
    return null
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
                <Navbar />
        ),
        children: [
            {
                index: true,
                element: <Home />,
                loader: homeLoader
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

]);

export default router;