import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Navbar from "../pages/Home/Navbar";
import About from "../pages/Home/About";
import Service from "../pages/Home/Service";
import Contact from "../pages/Home/Contact";
import NotFound from "../pages/Home/NotFound";

import Dashboard from "../pages/appdashboard/layout/Dashboard";
import UHome from "../pages/appdashboard/Home";
import Profile from "../pages/appdashboard/Profile";
import Students from "../pages/appdashboard/Students";
import Teachers from "../pages/appdashboard/Teachers";
import Course from "../pages/appdashboard/Courses";
import Registration from "../pages/appdashboard/Registration";
import Tranning from "../pages/appdashboard/Tranning";

import { ProctedRouteGuard, IsloginGuard } from "../_guard/route.guard";
import ApiRoutesCall from "./api.routes.call";

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
                loader: new ApiRoutesCall().atHomeCourseList
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
                element: <UHome />,
                loader: new ApiRoutesCall().homePageRoutesApiCall
            },
            {
                path: "/dashboard/profile",
                element: <Profile />,
                loader: new ApiRoutesCall().profileRoutesApiCall
            },
            {
                path: "/dashboard/tranning",
                element: <Tranning />
            },
            {
                path: "/dashboard/students",
                element: <Students />,
                loader: new ApiRoutesCall().studentsRoutesApiCall
            },
            {
                path: "/dashboard/teachers",
                element: <Teachers />,
                loader: new ApiRoutesCall().teachersRoutesApiCall
            },
            {
                path: "/dashboard/course",
                element: <Course />,
                loader: new ApiRoutesCall().courseRoutesApiCall
            },
            {
                path: "/dashboard/registration",
                element: <Registration />,
                loader: new ApiRoutesCall().tempStudentRoutesApiCall
            }
        ]
    },
    {
        // Catch-all route for 404 errors
        path: "*",
        element: <NotFound/>
    },

]);

export default router;