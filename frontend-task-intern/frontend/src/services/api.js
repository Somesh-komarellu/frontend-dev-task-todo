import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_URL,
});

//  request interceptor 
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;