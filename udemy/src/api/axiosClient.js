import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    timeout: 10000
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessKey = import.meta.env.VITE_ACCESS_KEY;
        if (!config.params) config.params = {};
        config.params.client_id = accessKey;

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;