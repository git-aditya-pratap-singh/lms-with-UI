import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login_popup, otp_popup, user_login_popup } from "../../redux/Slices/StateSlice";
import { useAuthGuard, storeTokenInStorage } from "../../_guard/auth.guard";
import Apiauth from "../../_api/auth/Apiauth.service";
import validateForm from "../../validation/validate";
import InputField from "../FormComponents/InputField";
//-------------ICON--------------------
import IconComponent from "../../../assets/icons/IconComponent";
//--------------CSS--------------------
import "../../../assets/css/home/_login.scss";

const LoginForms = ({forms, schema}) => {
  
    const dispatch = useDispatch();
    const [auth, setAuth] = useAuthGuard();
    const navigate = useNavigate();

    const handleValidate = (form, schema)=>{
        const errors = validateForm(form, schema)                            
        if(errors != {}) return Object.entries(errors)[0]; 
        return;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        const objFormData = Object.fromEntries(formData);
        const haveErrors = handleValidate(objFormData, schema);
        if (haveErrors) return toast.error(Object.values(haveErrors)[1]);
        //---API calling
        const apiResponse = await new Apiauth().login(objFormData);
        if (apiResponse.status) {
            storeTokenInStorage(apiResponse.data);
            setAuth({
                ...auth,
                user: apiResponse.data.UserInfo,
                token: apiResponse.data.token,
            });
            dispatch(login_popup(false));
            navigate("/dashboard/home");
        }
};

return (
    <>
      <section className="_loginContainer">
        <div className="_loginForm">
          <div className="_userIcon">
            <a href="#" >
              <svg
                id="logo-86"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
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

            </a>
          </div>

          <h3 onClick={() => dispatch(login_popup(false))}>
            <IconComponent iconType="crossIcon"/>
          </h3>
          <h1>Welcome Back!</h1>
          <p>Choose one of the option to go.</p>

          <form className="_form" onSubmit={handleSubmit}>
            {forms.map((items, index)=>{
              return(
                <InputField
                  key={index}
                  type={items.type}
                  name={items.name}
                  placeholder={items.placeholder}
                  autoComplete={items.autoComplete}
                  icon={items.icon}
                />
              )
            })}
            <button><IconComponent iconType="loginIcon"/>login</button>
          </form>

          <div className="flex justify-start items-center">
            <label>
              <label className="text-[var(--primary)] cursor-pointer text-[0.8rem] underline hover:text-green-500"
                onClick={() => dispatch(user_login_popup(true))}>
                Are you students/Teachers</label>
            </label>
          </div>

          <div className="flex justify-between items-center -mt-2">
            <label>
              <label className="text-red-500 cursor-pointer text-[0.8rem] underline hover:text-red-400"
                onClick={() => dispatch(otp_popup({ check: true, key: "forgetPswdOtp" }))}>
                forget password</label>
            </label>
            <label>
              <label className="text-[var(--primary)] hover:text-green-500 cursor-pointer text-[0.8rem] underline"
                onClick={() => dispatch(otp_popup({ check: true, key: "otpLogin" }))}>
                Login via OTP</label>
            </label>
          </div>

          <span className="-mt-3">
            <p>or Continue with</p>
          </span>

          <div className="_loginIcon">
            <span>
              <IconComponent iconType="googleIcon" iconSize="20"/>
            </span>
            <span>
              <IconComponent iconType="linkedInIcon" iconSize="20" iconColor="#007DFC"/>
            </span>
            <span>
              <IconComponent iconType="githubIcon" iconSize="20" iconStyle="text-gray-700"/>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

LoginForms.propTypes = {
    forms: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        autoComplete: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    schema: PropTypes.object, 
    validateOn: PropTypes.string,
};

export default LoginForms;
