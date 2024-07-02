import axios from "axios";
import environmentURL from "../_environments/environments";
//import Cookies from 'js-cookie';
class ApiService {

    constructor() {
        const userToken = JSON.parse(localStorage.getItem('token')); 
        const token = userToken ? userToken.token : null;
        this.api = axios.create({
            baseURL: environmentURL.apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });
    }
    async request(method, url, data = null, params = null) {
        try {
            const response = await this.api.request({
                method,
                url,
                data,
                params,
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    async get(url, params = null) {
        return this.request('GET', url, null, params);
    }
    async post(url, data) {
        return this.request('POST', url, data, null);
    }
    async put(url, data) {
        return this.request('PUT', url, data, null);
    }
    async delete(url, data = null) {
        return this.request('DELETE', url, data, null);
    }
    handleError(error) {
        console.error('API Error:', error);
        throw error; 
    }
}

export default ApiService;
