import axios from 'axios';

// Base axios instance — all API calls go through this
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
});

// AUTO-ATTACH TOKEN: runs before every request
// reads token from localStorage and adds it to header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// AUTO-LOGOUT: runs after every response
// if backend returns 401 (expired/invalid token) → clear storage and redirect to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;