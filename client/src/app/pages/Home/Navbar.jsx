import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login_popup } from "../../redux/Slices/StateSlice";
import ThemeMode from "../../_themes/ThemeMode";

import { FaHome, FaUser, FaPhoneAlt, FaChartPie } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { FaAngleDoubleUp } from "react-icons/fa";

import Login from "./Login";
import UserLogin from "./UserLogin";
import OtpLayout from "./OtpLayout";
import Footer from "./Footer";

import "../../../assets/css/home/_navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((store) => store.openPopup.open_login);
  const otpStatus = useSelector((store)=> store.openPopup.otp_popup_state);
  const userLoginStatus = useSelector((store)=>store.openPopup.userLoginPopup_state);

  const [toggle, setToggle] = useState(false);
  const [toggle_top, setToggleTop] = useState(false);

  const scrollTo = () => {
    if (window.scrollY >= 500) {
      setToggleTop(true);
    } else {
      setToggleTop(false);
    }
  };
  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", scrollTo);

  useEffect(() => {
    dispatch(login_popup(false));
  }, [otpStatus, userLoginStatus, dispatch]);

  return (
    <>
     { loginState && <Login /> }
     { (otpStatus.otpLogin || otpStatus.forgetPswdOtp) && <OtpLayout /> }
     { userLoginStatus && <UserLogin/> }

      <nav className="shadow-nav">
        <a href="#" className="_logo">
          <svg
            id="logo-86"
            width="40"
            height="40"
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
          elearn
        </a>

        <div
          className={`_navbar transition-all-duration-700 ease duration-700 ${
            toggle ? "left-0" : "left-[100%]"
          }`}
        >
          <ul>
            <li>
              <NavLink
                to="/"
                activeclassname="active"
                className="_navItem"
                onClick={() => setToggle(!toggle)}
              >
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="_navItem"
                onClick={() => setToggle(!toggle)}
              >
                <FaUser />
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/service"
                className="_navItem"
                onClick={() => setToggle(!toggle)}
              >
                <FaChartPie />
                Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="_navItem"
                onClick={() => setToggle(!toggle)}
              >
                <FaPhoneAlt />
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="_hamburger-menu bg-[var(--background)] border border-gray-300 shadow-md">
          <div onClick={() => setToggle(!toggle)}>
            <Hamburger
              className="text-white"
              size={25}
              duration={0.5}
              easing="ease-in"
              rounded
              toggled={toggle}
              toggle={!toggle}
            />
          </div>
        </div>

        <button
          className="_loginbtn"
          onClick={() => dispatch(login_popup(true))}
        >
          <BiLogInCircle />
          login
        </button>
      </nav>

      <ThemeMode/>

      
      <Outlet />
      <Footer />

      {toggle_top == true && (
        <div
          className="bg-[var(--primary)] p-3 rounded-full shadow-lg shadow-[var(--primary)]-500/70 z-10 bottom-[3%] right-[2%] fixed cursor-pointer"
          data-aos="zoom-in-out"
          onClick={ScrollTop}
        >
          <FaAngleDoubleUp className="text-white text-2xl" />
        </div>
      )}
    </>
  );
};
export default Navbar;
