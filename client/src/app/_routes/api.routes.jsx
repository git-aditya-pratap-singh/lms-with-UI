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

import { ProctedRouteGuard, IsloginGuard } from "../_guard/route.guard";
import ApiRoutesCall from "./api.routes.call";

const API_INSTANCE_CALL = new ApiRoutesCall();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <IsloginGuard>
                <Navbar />
            </IsloginGuard>
        ),
        children: [
            {
                index: true,
                element: <Home />,
                //loader: homeLoader
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
                element: <Profile />,
                loader: API_INSTANCE_CALL.profileRoutesApiCall
            },
            {
                path: "/dashboard/students",
                element: <Students />
            },
            {
                path: "/dashboard/teachers",
                element: <Teachers />,
                loader: API_INSTANCE_CALL.teachersRoutesApiCall
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