import axios from 'axios';

import { localStorages } from './localStorage';

const requestHandler = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/',
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

requestHandler.interceptors.request.use(
  (config) => {
    const token = localStorages.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default requestHandler;
