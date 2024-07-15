import { toast } from "react-toastify";

class BaseControllerResponse {

    handleResponse(params) {
        if (params.statusCode === 200 && params.status === true && params.data !== null) {
            toast.success("")
        }
        else if (params.statusCode === 200 && params.status === true) {
            toast.success("")
        }
        else if (params.statusCode === 201 && params.status === false) {
            toast.success("")
        }
        else if (params.statusCode === 500) {
            toast.success("")
        }
        else {
            // Handle any other cases
        }
    }
}

export default BaseControllerResponse;
