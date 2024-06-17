import ApiService from "../_service/api.service";

const API_INSTANCE = new ApiService();

class ApiRoutesCall {

    profileRoutesApiCall = async ()=>{
        try {
            const response = await API_INSTANCE.get('/admin/getProfileDetails');
            if(response.status === true){
                return response.data;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
export default ApiRoutesCall;