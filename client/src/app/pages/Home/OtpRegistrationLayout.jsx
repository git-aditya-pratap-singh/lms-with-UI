import { useState, useCallback } from 'react';

import OtpInput from "react-otp-input";
import OtpTimer from "../../components/OtpTimer";

import { RxCross1 } from "react-icons/rx";

import "../../../assets/css/home/_otp.scss";

const OtpRegistrationLayout = () => {

  const [otp, setOTP] = useState(null);
  const handleOtpInputChange = useCallback((otp) => {
    setOTP(otp);
  }, []);

  return (
    <>
      <section className="_otpContainer">
        <div className="_loginForm">
          <h3><RxCross1 /></h3>
          <h1>Validate Credinitial</h1>
          <p className="text-green-400">OTP send on your email.</p>


          <form className="_form">
            <OtpInput
              value={otp}
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
            <OtpTimer />
          </form>
        </div>
      </section>
    </>
  );
};
export default OtpRegistrationLayout;
