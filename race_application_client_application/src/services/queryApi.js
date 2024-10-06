import axios from 'axios';

const QUERY_API_URL = process.env.REACT_APP_QUERY_API_URL;

const queryApi = axios.create({
    baseURL: QUERY_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default queryApi;