import ApiService from "../_service/api.service";

const API_INSTANCE = new ApiService();

class ApiRoutesCall {

    atHomeCourseList = async()=>{
        try {
            const response = await API_INSTANCE.get('/fetchcourseOfregistration/getCourseList');
            return response.status === true ? response.data : null;
        }catch (err) {
            return null;
        }
    } 

    profileRoutesApiCall = async()=>{
        try {
            const response = await API_INSTANCE.get('/dashboard/profiles/getProfileDetails');
            return response.status === true ? response.data : null;
        }catch (err) {
            return null;
        }
    }

    studentsRoutesApiCall = async()=>{
        try{
            const apiCalls = [
                API_INSTANCE.get('/dashboard/students/getStudentsDeatils'),
                API_INSTANCE.get('/dashboard/course/getCourseList'),
            ];

            const responses = await Promise.all(apiCalls);
            const allResponsesSuccessful = responses.every(response => response.status === true);
            return allResponsesSuccessful ? responses.map(response => response.data) : null;
        }catch(err){
            return null;
        }
    }

    teachersRoutesApiCall = async()=>{
        try{
            const apiCalls = [
                API_INSTANCE.get('/dashboard/teachers/getTeachersDeatils'),
                API_INSTANCE.get('/dashboard/course/getCourseList'),
            ];

            const responses = await Promise.all(apiCalls);
            const allResponsesSuccessful = responses.every(response => response.status === true);
            return allResponsesSuccessful ? responses.map(response => response.data) : null;
        }catch(err){
            return 0;
        }
    }

    courseRoutesApiCall = async () => {
        try {
          const apiCalls = [
            API_INSTANCE.get('/dashboard/teachers/getCourseTeachersDeatils'),
            API_INSTANCE.get('/dashboard/courseTags/getCourseTags'),
          ];
      
          const responses = await Promise.all(apiCalls);
          const allResponsesSuccessful = responses.every(response => response.status === true);
          return allResponsesSuccessful ? responses.map(response => response.data) : null;
        } catch (err) {
          return null;
        }
      };
      
}
export default ApiRoutesCall;