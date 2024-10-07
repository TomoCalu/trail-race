import axios from "axios";

const COMMAND_API_URL = process.env.REACT_APP_COMMAND_API_URL;

const commandApi = axios.create({
  baseURL: COMMAND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default commandApi;
