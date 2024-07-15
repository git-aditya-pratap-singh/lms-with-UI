import { useState } from "react";
//import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login_popup, otp_popup } from "../../redux/Slices/StateSlice";
import { useNavigate } from "react-router-dom";
import ApiService from "../../_service/api.service";
import { useAuthGuard, storeTokenInStorage } from "../../_guard/auth.guard";

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

 

  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
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

    {
      /* Api Calling */
    }
    API_CALL(formData);
  };

  const API_INSTANCE = new ApiService();

  const API_CALL = async (loginData) => {
    try {
      const response = await API_INSTANCE.post("/login/login", loginData);

      if (response.status) {
        storeTokenInStorage(response.data);
        //Cookies.set('token', JSON.stringify(response.data),{ secure: true, sameSite: 'Strict' });
        setAuth({
          ...auth,
          user: response.data.userValid,
          token: response.data.token,
        });

        dispatch(login_popup(false));
        toast.success(response.message);
        navigate("/dashboard/home");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("API call error:", err);
      toast.error("An error occurred while trying to log in.");
    }
  };

  return (
    <>
   
      <section className="_loginContainer">
        <div className="_loginForm">
          <h3 onClick={() => dispatch(login_popup(false))}>
            <RxCross1 />
          </h3>
          <h1>Welcome Back!</h1>
          <p>Choose one of the option to go.</p>
          <form className="_form" onSubmit={handleSubmit} action="../../_api/login" method="POST">

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
            <span>
              <p>or Continue with</p>
            </span>
            <label>
              <label className="text-[var(--primary)] hover:text-green-500 cursor-pointer text-sm underline"
              onClick={()=> dispatch(otp_popup(true))}
              >Login via OTP</label>
            </label>
          </div>

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
      </section>
    </>
  );
};
export default Login;
