import ApiService from '../../_service/api.service';
import BaseControllerResponse from '../../utils/BaseControllerResponse';

class Apiauth extends BaseControllerResponse {

  login = async (formData) => {
    try {
      const response = await new ApiService().post("/login/login", formData);
      this.handleResponse(response);
      return response;
    } catch (err) {
      return this.handleResponse(err);
    }
  }

  forgetpasswordSendOTP = async(email)=>{
    try {
      const response = await new ApiService().post("/forget-password/send-otp", {emailS: email});
      this.handleResponse(response);
      return response;
    } catch (err) {
      return this.handleResponse(err);
    }
  }

  forgetpasswordVerifiedOTP = async(otp)=>{
    try {
      const response = await new ApiService().post("/forget-password/verified-otp", {OTP: otp});
      this.handleResponse(response);
      return response;
    } catch (err) {
      return this.handleResponse(err);
    }
  }

  forgetpasswordChanged = async(email, password)=>{
    try{
      const response = await new ApiService().post("/forget-password/change-password", {Email: email, Password: password});
      this.handleResponse(response);
      return response;
    }catch(err){
      return this.handleResponse(err);
    }
  }

}

export default Apiauth;
