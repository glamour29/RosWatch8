import axios from 'axios';

import { localStorages } from './localStorage';

const requestHandler = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

requestHandler.interceptors.request.use(
  (config) => {
    // Lấy token từ Local Storage
    const token = localStorages.getToken();
    // Nếu token tồn tại, thêm vào header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default requestHandler;
