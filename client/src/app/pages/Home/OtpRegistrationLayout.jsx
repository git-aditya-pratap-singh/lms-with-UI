import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration_otp_popup } from "../../redux/Slices/StateSlice";
import Apiauth from '../../_api/auth/Apiauth.service';

import OtpInput from "react-otp-input";
import OtpTimer from "../../components/OtpTimer";

import { RxCross1 } from "react-icons/rx";

import "../../../assets/css/home/_otp.scss";

const OtpRegistrationLayout = () => {

  const dispatch = useDispatch();
  const registrationData = useSelector((store)=>store.openPopup.registrationData);

  const [otp, setOTP] = useState(null);
  const handleOtpInputChange = useCallback((otp) => {
    setOTP(otp);
  }, []);

  const VerifiedOTPandRegistartion = async(event)=>{
    event.preventDefault();
    const token = localStorage.getItem("OTPToken");
    const apiResponse = await new Apiauth().registrationStudent_withOTP_verified(otp, token, registrationData);
  }

  return (
    <>
      <section className="_otpContainer">
        <div className="_loginForm">
          <h3 onClick={ ()=> dispatch(registration_otp_popup(false)) }><RxCross1 /></h3>
          <h1>Verify your email.</h1>
          <label className="text-green-500 text-sm">OTP send on your email.</label>
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
            <div className="flex justify-between w-full">
              <button onClick={VerifiedOTPandRegistartion}>Verified</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default OtpRegistrationLayout;
