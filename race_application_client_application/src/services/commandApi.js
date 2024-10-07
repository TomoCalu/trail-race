import axios from 'axios';

const COMMAND_API_URL = process.env.REACT_APP_COMMAND_API_URL;

const commandApi = axios.create({
  baseURL: COMMAND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

commandApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default commandApi;
