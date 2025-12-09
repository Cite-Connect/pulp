import axios from 'axios';

export const apiClientV1 = axios.create({
    baseURL: '/api/v1',
    headers: {
    'Content-Type': 'application/json',
    },
});

apiClientV1.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        
        if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClientV1.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        console.warn('Unauthorized - Token may be expired');
        }
        return Promise.reject(error);
    }
);

apiClientV1.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if the error status is 401 (Unauthorized)
        if (error.response?.status === 401) {
        console.warn('Unauthorized - Token expired or invalid. Redirecting...');

        if (typeof window !== 'undefined') {

            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            
            window.location.href = '/unauthorized';
        }
        }
        return Promise.reject(error);
    }
);