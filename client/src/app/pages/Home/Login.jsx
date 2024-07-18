import { useState } from "react";
//import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { login_popup, otp_popup } from "../../redux/Slices/StateSlice";
import { useNavigate } from "react-router-dom";
import OtpLayout from "./OtpLayout";
import { useAuthGuard, storeTokenInStorage} from "../../_guard/auth.guard";
import Apiauth from "../../_api/auth/Apiauth.service";

//-------------ICON--------------------
import { FaGithub, FaLinkedinIn, FaFingerprint } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BiLogInCircle } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAlternateEmail } from "react-icons/md";
//--------------CSS--------------------
import "../../../assets/css/home/_login.scss";

const Login = () => {

  const dispatch = useDispatch();
  const [auth, setAuth] = useAuthGuard();
  const navigate = useNavigate();
  const otpStatus = useSelector((store)=> store.openPopup.otp_popup_state);
  //const loginStatus = useSelector((store)=> store.openPopup.open_login);

  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!formData.username) {
      toast.warning("username should not be empty!!");
      return;
    }
    if (!isNaN(formData.name)) {
      toast.warning("username field should not be entered number!!");
      return;
    }
    if (!formData.password) {
      toast.warning("password should not be empty!!");
      return;
    }
    //---API calling
    const apiResponse = await new Apiauth().login(formData);
    if (apiResponse.status) {
      storeTokenInStorage(apiResponse.data);
      setAuth({
        ...auth,
        user: apiResponse.data.userValid,
        token: apiResponse.data.token,
      });
      dispatch(login_popup(false));
      navigate("/dashboard/home");
    }

  };

  return (
    <>
    <section className="_loginContainer">
     {(otpStatus.otpLogin || otpStatus.forgetPswdOtp) ?  <OtpLayout/> : 
     
     /** This is a Login Models */
  
        <div className="_loginForm">
          <h3 onClick={() => dispatch(login_popup(false))}>
            <RxCross1 />
          </h3>
          <h1>Welcome Back!</h1>
          <p>Choose one of the option to go.</p>
          <form className="_form" onSubmit={handleSubmit}>

            <span>
              <input
                type="text"
                placeholder="enter username/email..."
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <label>
                <MdOutlineAlternateEmail />
              </label>
            </span>

            <span> 
              <input
                type="password"
                autoComplete="off"
                placeholder="enter password..."
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
               <label>
                <FaFingerprint />
              </label>
            </span>

            <button>
              <BiLogInCircle />
              login
            </button>
          </form>

          <div className="flex justify-between items-center">
            <label>
              <label className="text-red-500 cursor-pointer text-sm underline hover:text-red-400"
              onClick={()=> dispatch(otp_popup({ check: true, key: "forgetPswdOtp" })) }
              >forget password</label>
            </label>
            <label>
              <label className="text-[var(--primary)] hover:text-green-500 cursor-pointer text-sm underline"
              onClick={()=> dispatch(otp_popup({ check: true, key: "otpLogin" })) }
              >Login via OTP</label>
            </label>
          </div>

          <span className="-mt-3">
              <p>or Continue with</p>
          </span>
          <div className="_loginIcon">
            <span>
              <FcGoogle size={20} />
            </span>
            <span>
              <FaLinkedinIn size={20} color="#007DFC" />
            </span>
            <span>
              <FaGithub size={20} />
            </span>
          </div>
        </div>
    }
    </section>
    </>
  );
};
export default Login;
