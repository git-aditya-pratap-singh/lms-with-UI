import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { otp_popup } from "../../redux/Slices/StateSlice";

import { BiLogInCircle } from "react-icons/bi";
import { FaFingerprint } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

import "../../../assets/css/home/_otp.scss";

const OtpLayout = () => {

  const dispatch = useDispatch();
  const otpStatus = useSelector((store)=> store.openPopup.otp_popup_state);
  const [email, setEmail] = useState('');
  const [loginotp, setloginOTP] = useState(null);
  const [Verifiedloginotp, VerifiedsetloginOTP] = useState(null);


  const handleChange = (event) =>{
    setEmail(event.target.value)
  }

  return (
    <>
    { (otpStatus.otpLogin || otpStatus.forgetPswdOtp) &&

      <section className="_otpContainer">
        <div className="_loginForm">
          <h3 onClick={() => {
            otpStatus.otpLogin 
            ? dispatch(otp_popup({ check: false, key: "otpLogin" })) 
            : dispatch(otp_popup({ check: false, key: "forgetPswdOtp" }))
            }}
          >
            <RxCross1 />
          </h3>
          <h1>Login via OTP!</h1>
          <p>Choose OTP of the option to go.</p>
          <form className="_form">

            <span>
              <input
                type="email"
                placeholder="john.doe@company.com"
                name="username"
                value={email}
                onChange={handleChange}
              />
               <label>
                <MdOutlineAlternateEmail />
              </label>
            </span>
          
          { loginotp && 
            <OtpInput
              value={loginotp}
              onChange={setloginOTP}
              numInputs={4}
              separator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{ display: "flex", justifyContent: "center" }}
              shouldAutoFocus={true}
              inputStyle={{
                width: "40px",
                height: "40px",
                fontSize: "18px",
                margin: "0 18px",
                border: "1px solid var(--primary)",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
            />
          }

          { Verifiedloginotp && 
            <span>
              <input
                type="password"
                placeholder="create new password"
                name="password"
                autoComplete="off"
                
                onChange={handleChange}
              />
               <label>
                <FaFingerprint />
              </label>
            </span>
          }

          { !loginotp &&
            <div className="flex justify-between w-full gap-x-8">
              <button>
                <FaArrowRotateLeft />
                Resend OTP
              </button>

              <button>
                <BiLogInCircle />
                Send OTP
              </button>
            </div>
          }

            <div className="flex justify-between w-full gap-x-8">
              <button>
                <BiLogInCircle />
                Verified OTP
              </button>
            </div>

            <div className="flex justify-between w-full gap-x-8">
              <button>
                <BiLogInCircle />
                Generate New Password
              </button>
            </div>

          </form>
        </div>
      </section>
    }    
    </>
  );
};
export default OtpLayout;
