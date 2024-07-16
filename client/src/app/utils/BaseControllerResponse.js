import { toast } from "react-toastify";

class BaseControllerResponse {

    handleResponse(resp) {
        if (resp.statusCode === 200 && resp.status === true && resp.data !== null) {
            console.log("1")
            return toast.success(resp.message);
        }
        else if (resp.statusCode === 200 && resp.status === true) {
            console.log("2")
            return toast.success(resp.message);
        }
        else if (resp.statusCode === 201 && resp.status === false) {
            console.log("3")
            return toast.error(resp.message);
        }
        else if (resp.statusCode === 401) {
            return toast.error("You are not authorized for this Actions");
        }
        else if (resp.statusCode === 500) {
            return toast.error("SERVER-ERROR!!");
        }
        else {
            return toast.warning("Something went wrong, Please contact to the administrator.");
        }
    }
}

export default BaseControllerResponse;
