import axios from 'axios';

const QUERY_API_URL = process.env.REACT_APP_QUERY_API_URL;

const queryApi = axios.create({
  baseURL: QUERY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

queryApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default queryApi;
