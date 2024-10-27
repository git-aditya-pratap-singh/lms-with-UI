import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Hamburger from "hamburger-react";
import Cookies from 'js-cookie';
import toTitleCase from "../../../common/titleCase";
import NotificationPopup from "../../../components/NotificationPopup";
import { useAuthGuard, storeTokenRemove } from "../../../_guard/auth.guard";
import ThemeSwitcher from "../../../_themes/ThemeSwitcher";

import { AiFillDashboard } from "react-icons/ai";
import { FaUserCircle, FaChalkboardTeacher, FaUsers, FaBookReader, FaDatabase, FaBell } from "react-icons/fa";
import { FaUsersViewfinder, FaCircleUser } from "react-icons/fa6";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

import "../../../../assets/css/admin/_dashboard.scss";

const Dashboard = () => {

  const [toggle, setToggle] = useState(false);
  const [notifyPopup , setnotifyPopup] = useState(false);
  const [auth, setAuth] = useAuthGuard();
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const locationPaths = pathnames.map((item, index) => index === pathnames.length - 1 ? toTitleCase(item) : toTitleCase(`${item} /`));
 
  const logout = () => {
    setToggle(!toggle);
    setAuth({
      ...auth,
      user: null,
      token: null,
    })
    storeTokenRemove();
    Cookies.remove('token');
    toast.success("You have Successfully logged out!!");
    navigate("../");
  }

  const NavLinkCSS = ({ isActive }) => {
    return {
      backgroundColor: isActive ? 'var(--primary)' : '',
      color: isActive ? 'white' : '',
      borderRadius: isActive ? '5px' : '',
      boxShodow: isActive ? 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px' : '',
    }
  }


  return (
    <>
      <section className="_dashboard">
        <div className={`_navBar ${toggle ? 'left-0 top-[0rem]' : 'left-[-300px] top-[0rem]'}`}>
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
                fill="red"
              ></path>
            </svg>
            <h1>elearn</h1>
          </div>
          
          <div className="h-full pb-8 _navItemSection">
          <div className="_navItem">
            <ul>
              <NavLink to="/dashboard/home"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><AiFillDashboard size={23} className="drop-shadow-md" /><li>Dashboard</li></span>
              </NavLink>

              <NavLink to="/dashboard/profile"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><FaUserCircle size={23} className="drop-shadow-md" /><li>Profile</li></span>
              </NavLink>

              <NavLink to="/dashboard/tranning"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><FaChalkboardTeacher size={23} className="drop-shadow-md" /><li>Tranning</li></span>
              </NavLink>

              <NavLink to="/dashboard/students"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}><span>
                  <FaUsersViewfinder size={23} className="drop-shadow-md" /><li>Students</li></span>
              </NavLink>

              <NavLink to="/dashboard/teachers"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><FaUsers size={23} className="drop-shadow-md" /><li>Teachers</li></span>
              </NavLink>

              <NavLink to="/dashboard/course"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><FaBookReader size={21} className="drop-shadow-md" /><li>Courses</li></span>
              </NavLink>

              <NavLink to="/dashboard/attendance"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><BsFillFileEarmarkSpreadsheetFill size={21} className="drop-shadow-md" /><li>Attendance</li></span>
              </NavLink>

              <NavLink to="/dashboard/registration"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><FaDatabase size={21} className="drop-shadow-md" /><li>Registration</li></span>
              </NavLink>


               <NavLink to="/dashboard/notification"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><FaBell size={21} className="drop-shadow-md" /><li>Notification</li></span>
              </NavLink> 

              <NavLink to="/dashboard/settings"
                style={NavLinkCSS} onClick={() => setToggle(!toggle)}>
                <span><IoSettingsSharp size={23} className="drop-shadow-md" /><li>Settings</li></span>
              </NavLink>

              <NavLink to=""
                style={NavLinkCSS} onClick={logout}>
                <span><IoMdLogOut size={23} className="drop-shadow-md" /><li>Logout</li></span>
              </NavLink>

            </ul>
          </div>
          </div>
        </div>



        <section className="w-full flex flex-col gap-2 h-full">
          <div className="_dashSection">
            {/* Create BreadCrum */}
            <div className="flex justify-center items-center gap-5">

              <div className="_navIcon">
                <div className="bg-gray-200 rounded">
                  <a onClick={() => setToggle(!toggle)}>
                    <Hamburger
                      color="#323035"
                      size={25}
                      duration={0.5}
                      easing="ease-in"
                      rounded
                      toggled={toggle}
                      toggle={!toggle}
                    />
                  </a>
                </div>
              </div>

              <div className="_breadCrums">
                <ul>
                  {locationPaths.map((elem,index)=>{
                     return(<li key={index}> {elem} </li>)
                  })}
                </ul>
                <span className="text-[var(--primary)]">{locationPaths[locationPaths.length-1]}</span>
              </div>

            </div>

            <div className="_dashDetails">

              <ThemeSwitcher/>

              <span>
                <label><FaCircleUser size={21} /></label>
                <label><FaBell size={18} onClick={() => setnotifyPopup(!notifyPopup)}/></label>
                <label><HiOutlineDotsVertical size={21} /></label>
              </span>
            </div>
            
            <div className={`absolute right-[1rem] top-[4.3rem] z-[2] duration-300 
              ease-in-out ${notifyPopup ? '_notificationPopup_open' : '_notificationPopup_close'} `}>
              <NotificationPopup/>
            </div>
            

          </div>

          <div className="_welcomeKit">
            <label>Welcome Back {toTitleCase(auth?.user?.name)} 🙋‍♂️!</label>
            {/* <label>Time: <label className="text-blue-500">01</label> : 
              <label className="text-red-500"> 24</label> :
              <label className="text-green-500"> 37</label>
              <label className="text-yellow-500"> AM</label>
            </label> */}
          </div>

          <div className="_outlet">
            <Outlet />
          </div>

        </section>

      </section>

    </>
  );
};
export default Dashboard;
