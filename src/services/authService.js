import api from './api.js';

const authService = {
    // sends username + password to backend
    // backend verifies and returns token + user info
    login: async (username, password) => {
        console.log('🟡 AUTH SERVICE LOGIN CALLED with:', { username, password: '***' });
        const response = await api.post('/auth/login', { username, password });
        console.log('🟡 AUTH SERVICE RESPONSE:', response);
        return response.data;
    },

    // saves token and user info to localStorage after login
    saveSession: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // removes everything from localStorage on logout
    logout: () => {
        localStorage.clear();
    },

    // returns the saved user object from localStorage
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // returns true if token exists (user is logged in
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;