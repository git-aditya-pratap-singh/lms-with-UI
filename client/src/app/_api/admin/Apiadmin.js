import ApiService from '../../_service/api.service';
import BaseControllerResponse from '../../utils/BaseControllerResponse';

class Apiadmin extends BaseControllerResponse {

    profileUpdate = async (formData) => {
        try{
            const response = await new ApiService().put('/dashboard/profiles/updateDetails', formData);
            return this.handleResponse(response);
        }catch(err){
            return this.handleResponse(err);
        }
    }

}

export default Apiadmin;
