import axios from 'axios';
import auth from './auth'; // Certifique-se de importar auth

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajuste a URL base conforme necessário
});

api.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
