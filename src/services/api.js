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
        console.log('🔵 REQUEST INTERCEPTOR TRIGGERED');
        console.log('🔵 Request URL:', config.baseURL + config.url);
        console.log('🔵 Request method:', config.method);
        console.log('🔵 Full config:', JSON.parse(JSON.stringify(config)));
        const token = localStorage.getItem('token');
        console.log('🔵 Token from localStorage:', token ? token.substring(0, 30) + '...' : 'NULL/EMPTY');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('🔵 Final headers:', JSON.parse(JSON.stringify(config.headers)));
        return config;
    },
    (error) => Promise.reject(error)
);

// AUTO-LOGOUT: runs after every response
// if backend returns 401 (expired/invalid token) → clear storage and redirect to login
api.interceptors.response.use(
    (response) => {
        console.log('🟢 RESPONSE SUCCESS');
        console.log('🟢 Status:', response.status);
        console.log('🟢 Data:', response.data);
        return response;
    },
    (error) => {
        console.log('🔴 RESPONSE ERROR TRIGGERED');
        console.log('🔴 error.response:', error.response);
        console.log('🔴 error.response?.status:', error.response?.status);
        console.log('🔴 error.config.url:', error.config?.url);
        console.log('🔴 Full error:', error);
        if (error.response?.status === 401) {
            console.log('🔴 401 DETECTED — clearing localStorage and redirecting to /login');
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;