import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

/**
 * Insert Injection here to add authorization
 */
export default apiInstance;