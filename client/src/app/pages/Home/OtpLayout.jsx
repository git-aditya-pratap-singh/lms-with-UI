import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { otp_popup } from "../../Store/Slices/StateSlice";

import { BiLogInCircle } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

import "../../../assets/css/home/_otp.scss";

const OtpLayout = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const handleChange = (event) =>{
    setEmail(event.target.value)
  }

  return (
    <>
      <section className="_otpContainer">
        <div className="_loginForm">
          <h3 onClick={() => dispatch(otp_popup(false))}>
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

            <OtpInput
              value={otp}
              onChange={setOTP}
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
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;",
              }}
            />

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

          </form>
        </div>
      </section>
    </>
  );
};
export default OtpLayout;
