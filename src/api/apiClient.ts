import axios from 'axios';
import setAccessToken from '../utils/setAccessToken';

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if(error.status === 401) {
    setAccessToken();
  }
  return Promise.reject(error);
});


export default apiClient;