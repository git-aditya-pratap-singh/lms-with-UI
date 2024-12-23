import ApiService from '../../_service/api.service';
import BaseControllerResponse from '../../utils/BaseControllerResponse';

class Apiadmin extends BaseControllerResponse {

    profileUpdate = async(formData) => {
        try{
            const response = await new ApiService().put('/dashboard/profiles/updateDetails', formData);
            this.handleResponse(response);
            return response;
        }catch(err){
            return this.handleResponse(err);
        }
    }

    addStudent = async(formEditinfo, formData)=>{
        try{
            const endpoint = formEditinfo.add ? "/dashboard/students/addStudents" : "/dashboard/students/editStudents";
            const response = formEditinfo.add ? await new ApiService().post(endpoint, formData) : await new ApiService().put(endpoint, formData);
            this.handleResponse(response);
            return response;
        }catch (err) {
            return this.handleResponse(err);
        }
    }

    addTeachers = async(formEditinfo, formData)=>{
        try{
            const endpoint = formEditinfo.add ? "/dashboard/teachers/addTeachers" : "/dashboard/teachers/editTeachers";
            const response = formEditinfo.add ? await new ApiService().post(endpoint, formData) : await new ApiService().put(endpoint, formData);
            this.handleResponse(response);
            return response;
        }catch (err) {
            return this.handleResponse(err);
        }
    }

    addCourses = async(formData)=>{
        try {
            const response = await new ApiService().uploadFileWithData('/dashboard/course/addCourse', formData);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    downloadExcelSheetforStudents = async()=>{
        try {
            const response = await new ApiService().get('/dashboard/students/downloadExcelSheet');
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }
    downloadExcelSheetforTeachers = async()=>{
        try {
            const response = await new ApiService().get('/dashboard/teachers/downloadExcelSheet');
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

}

export default Apiadmin;
