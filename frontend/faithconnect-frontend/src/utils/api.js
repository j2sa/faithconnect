import axios from 'axios';
import auth from './auth';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajuste a URL base conforme necessário
  withCredentials: true, // Permitir envio de cookies
});

api.interceptors.request.use(async (config) => {
  // Adicionando uma exceção para a rota de login
  if (config.url === '/login') {
    return config;
  }

  let token = sessionStorage.getItem('accessToken');
  if (token) {
    try {
      // Verificar a expiração do token
      const tokenExp = jwtDecode(token).exp;
      const now = Date.now() / 1000;
      if (tokenExp < now) {
        // Token expirou, redirecionar para login
        auth.clearToken();
        auth.clearRefreshToken();
        window.location.href = '/login'; // Redirecionar para o login se o token estiver expirado
        return Promise.reject(new Error('Token expirado'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      // Lidar com erro de token malformado
      auth.clearToken();
      auth.clearRefreshToken();
      window.location.href = '/login'; // Redirecionar para o login se o token for inválido
      return Promise.reject(new Error('Token inválido'));
    }
  }
  return config;
});

export default api;
