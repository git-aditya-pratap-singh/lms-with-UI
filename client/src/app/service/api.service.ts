import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api/v1',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    private request = async (method: AxiosRequestConfig['method'], url: string, data: any = null, params: any = null, headers: any = {}): Promise<any> => {
        try {
            const response: AxiosResponse = await this.api.request({
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

    public get = async (url: string, params: any = null, headers: any = {}): Promise<any> => {
        return this.request('GET', url, null, params, headers);
    }

    public post = async (url: string, data: any, headers: any = {}): Promise<any> => {
        return this.request('POST', url, data, null, headers);
    }

    public put = async (url: string, data: any, headers: any = {}): Promise<any> => {
        return this.request('PUT', url, data, null, headers);
    }

    public delete = async (url: string, data: any = null, headers: any = {}): Promise<any> => {
        return this.request('DELETE', url, data, null, headers);
    }

    private handleError = (error: AxiosError): void => {
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
