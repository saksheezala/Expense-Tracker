import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add any request modifications here, like adding auth tokens
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle response data here if needed
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with a status other than 2xx
            if (error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                console.error('Unauthorized access - redirecting to login');
                window.location.href = '/login'; // Clean URL for BrowserRouter
            } else if(error.response.status === 500) {
                // Handle server errors
                console.error('Server error occurred:', error.response.data);
            } else if (error.code === "ECONNABORTED") {
                // Handle timeout errors
                console.error('Request timed out:', error.message);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;