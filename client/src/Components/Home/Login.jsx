import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BiLogInCircle } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

import { useDispatch } from "react-redux";
import { login_popup } from "../Store/Slices/StateSlice"

import "../../assets/css/_login.scss";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <>
      <section className="_loginContainer">
        <div className="_loginForm">
          <h3 onClick={()=>dispatch(login_popup(false))}><RxCross1/></h3>
          <h1>Welcome Back!</h1>
          <p>Choose one of the option to go.</p>
          <form className="_form">
            <input
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
            />
            <button><BiLogInCircle/>login</button>
          </form>
          <span>
            <p>or continue with</p>
          </span>
          <div className="_loginIcon">
            <span><FcGoogle size={20}/></span>
            <span><FaLinkedinIn size={20} color="#007DFC"/></span>
            <span><FaGithub size={20}/></span>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;