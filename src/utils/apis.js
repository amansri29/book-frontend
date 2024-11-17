import axios from 'axios';

// Set up the base URL to connect with the backend
const API_URL = 'http://127.0.0.1:8000/api/';  // Make sure to update if different

// Create an Axios instance for making requests
const api = axios.create({
    baseURL: API_URL,
});

// Add an Authorization token to headers for authenticated requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Token ${token}`; // Attach token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
