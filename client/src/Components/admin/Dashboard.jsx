import { Outlet } from "react-router-dom";

import { AiFillDashboard } from "react-icons/ai";
import { FaUserCircle, FaChalkboardTeacher, FaUsers, FaBookReader, FaRupeeSign, FaBell } from "react-icons/fa";
import { FaUsersViewfinder, FaCircleUser } from "react-icons/fa6";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

import "../../assets/css/admin/_dashboard.scss";
import Home_admin from "./Home_admin";
import Profile_admin from "./Profile_admin";

const Dashboard = () => {
  return (
    <>
      <section className="_dashboard">
        <div className="_navBar">
          <div className="_logo">
            <svg
              id="logo-86"
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="ccustom"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 
          36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 
          34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.69181 
          36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 
          27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 
          27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 
          14.3459 27.2002 12.7841 25.5557 11.6853Z"
                fill="#007DFC"
              ></path>
              <path
                className="ccustom"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5.16562e-07C10 1.31322 9.74135 2.61358 9.2388 3.82683C8.73625 5.04009 7.99966 6.14248 7.07107 7.07107C6.14249 7.99966
            5.0401 8.73625 3.82684 9.2388C2.61358 9.74134 1.31322 10 5.4439e-06 10L5.00679e-06 20C2.62644 20 5.22716 19.4827 7.65368 
            18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 
            2.62643 20 -3.81469e-06L10 5.16562e-07Z"
                fill="#007DFC"
              ></path>
            </svg>
            <h1>elearn</h1>
          </div>

          <div className="_navItem">
            <ul>
              <span><AiFillDashboard size={23} /><li>Dashboard</li></span>
              <span><FaUserCircle size={23} /><li>Profile</li></span>
              <span><FaChalkboardTeacher size={23} /><li>Tranning</li></span>
              <span><FaUsersViewfinder size={23} /><li>Students</li></span>
              <span><FaUsers size={23} /><li>Teachers</li></span>
              <span><FaBookReader size={21} /><li>Courses</li></span>
              <span><BsFillFileEarmarkSpreadsheetFill size={21} /><li>Attendance</li></span>
              <span><FaRupeeSign size={21} /><li>Fee Details</li></span>
              <span><FaBell size={21} /><li>Notification</li></span>
              <span><IoSettingsSharp size={23} /><li>Settings</li></span>
              <span><IoMdLogOut size={23} /><li>Logout</li></span>
            </ul>
          </div>
        </div>



        <section className="w-full flex flex-col gap-5 h-fit">
          <div className="_dashSection">
            {/* Create BreadCrum */}
            <div className="_breadCrums">
              <ul>
                <li>Dashboard  /</li>
                <li>Home</li>
              </ul>
              <span>Home</span>
            </div>

            <div className="_dashDetails">
              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                </div>
              </div>
              <label><FaCircleUser size={21} /></label>
              <label><FaBell size={18} /></label>
              <label><HiOutlineDotsVertical size={21} /></label>
            </div>
          </div>

          <div className="_welcomeKit">
            <label>Welcome Back Aditya!</label>
          </div>

          <div className="_outlet">
            <Outlet/>
          </div>
          
          <Home_admin/>
          <Profile_admin/>
        </section>
      </section>
    </>
  );
};
export default Dashboard;
