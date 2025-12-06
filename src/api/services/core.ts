import axios from 'axios';

export const apiClientV1 = axios.create({
    baseURL: 'https://citeconnect-backend-api-897523647765.us-central1.run.app/api/v1', // This now routes to your backend via the rewrite
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