import axios from 'axios';

const axiosClient1 = axios.create({
    baseURL: import.meta.env.VITE_JSON_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    timeout: 10000
});

axiosClient1.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient1;