import axios from "axios";
import environmentURL from "../environments/environments";

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: environmentURL.apiUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    async request(method, url, data = null, params = null, headers = {}) {
        try {
            const response = await this.api.request({
                method,
                url,
                data,
                params,
                headers,
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async get(url, params = null, headers = {}) {
        return this.request('GET', url, null, params, headers);
    }

    async post(url, data, headers = {}) {
        return this.request('POST', url, data, null, headers);
    }

    async put(url, data, headers = {}) {
        return this.request('PUT', url, data, null, headers);
    }

    async delete(url, data = null, headers = {}) {
        return this.request('DELETE', url, data, null, headers);
    }

    handleError(error) {
        console.error('API Error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error; 
    }
}

export default ApiService;
