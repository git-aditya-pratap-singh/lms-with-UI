import { useDispatch } from "react-redux";
import { registration_popup } from "../Store/Slices/StateSlice";

import { BiLogInCircle } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaUser, FaPhoneAlt, FaFingerprint } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

import "../../assets/css/home/_registration.scss";

const Registration = () => {
  const dispatch = useDispatch();
  return (
    <>
      <section className="_registerSection">
        <div className="_regisForm">
          <h3 onClick={() => dispatch(registration_popup(false))}>
            <RxCross1 />
          </h3>
          <h1>Registration here!...</h1>
          <p>Please! enter your details.</p>
          <form className="_form" autoComplete="off">
            <span>
              <label>
                <FaUser />
              </label>
              <input type="text" placeholder="enter name..." name="name" />
            </span>

            <span>
              <label>
                <MdOutlineAlternateEmail />
              </label>
              <input type="email" placeholder="enter email..." name="email" />
            </span>

            <span>
              <label>
                <FaPhoneAlt />
              </label>
              <input
                type="text"
                placeholder="enter phone-no..."
                name="phoneno"
              />
            </span>

            <span>
              <label>
                <FaFingerprint />
              </label>
              <input
                type="password"
                placeholder="enter password"
                name="password"
              />
            </span>

            <div className="space-y-2">
              <label className="text-[0.9rem]">Select Gender : </label>
              <div className="flex">
                <div className="flex items-center me-4">
                  <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                </div>
                <div className="flex items-center me-4">
                  <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                </div>
              </div>
            </div>

            <button>
              <BiLogInCircle />
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
export default Registration;
