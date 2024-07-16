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

}

export default Apiauth;
