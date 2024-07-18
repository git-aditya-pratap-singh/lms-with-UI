import { useState,useCallback } from "react";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { otp_popup } from "../../redux/Slices/StateSlice";
import Apiauth from "../../_api/auth/Apiauth.service";

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
  const [forgetOTPStatus, setforgetOTPStatus] = useState(false)
  const [forgetotp, setforgetnOTP] = useState();
  const [Verifiedloginotp, VerifiedsetloginOTP] = useState();

  const handleChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleOtpInputChange = useCallback((otp) => {
    setforgetnOTP(otp);
  }, []);

  const funcSendOTPforpswd = async(event)=>{
    event.preventDefault();
    if(!email){
      return toast.error("Email can't be empty!!");
    }
    const apiResponse = await new Apiauth().forgetpasswordSendOTP(email);
    console.log('responseget')
    if(apiResponse.status)
      setforgetOTPStatus(true)
  }

  return (
    <>
 
    { (otpStatus.otpLogin || otpStatus.forgetPswdOtp) &&

      
        <div className="_loginForm">
          <h3 onClick={() => {
            otpStatus.otpLogin 
            ? dispatch(otp_popup({ check: false, key: "otpLogin" })) 
            : dispatch(otp_popup({ check: false, key: "forgetPswdOtp" }))
            }}
          >
            <RxCross1 />
          </h3>
          
          {otpStatus.otpLogin ? <h1>Login via OTP!</h1> : <h1>Reset Password by OTP!</h1>}
          
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
          
          { forgetotp && 
            <OtpInput
              value={forgetotp}
              onChange={handleOtpInputChange}
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

          { (!forgetOTPStatus && !Verifiedloginotp) && 
            <div className="flex justify-between w-full gap-x-8">
              <button><FaArrowRotateLeft />Resend OTP</button>
              <button onClick={funcSendOTPforpswd}><BiLogInCircle />Send OTP</button>
            </div>
          }
          
          { forgetOTPStatus && 
            <div className="flex justify-between w-full gap-x-8">
              <button>
                <BiLogInCircle />
                Verified OTP
              </button>
            </div>
          }

          { Verifiedloginotp && 
            <div className="flex justify-between w-full gap-x-8">
              <button>
                <BiLogInCircle />
                Generate New Password
              </button>
            </div>
          }
          </form>
        </div>
      
    } 

    </>
  );
};
export default OtpLayout;
