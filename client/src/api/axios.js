import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY || 'http://localhost:3001/',
  timeout: 3000,
});

export default AxiosInstance;
