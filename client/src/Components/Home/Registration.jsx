import { useDispatch } from "react-redux";
import { registration_popup } from "../Store/Slices/StateSlice";

import { BiLogInCircle } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaUser,FaPhoneAlt,FaFingerprint } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

import "../../assets/css/_registration.scss";

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
          <p>Choose one of the option to go.</p>
          <form className="_form" autoComplete="off">
            <span>
              <label>
                <FaUser />
              </label>
              <input type="text" placeholder="enter name..." name="name" />
            </span>

            <span>
              <label>
                <MdOutlineAlternateEmail/>
              </label>
              <input type="email" placeholder="enter email..." name="email" />
            </span>

            <span>
              <label>
                <FaPhoneAlt/>
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
