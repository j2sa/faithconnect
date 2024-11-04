import { jwtDecode } from 'jwt-decode';

const auth = {
  setToken: (token) => {
    sessionStorage.setItem('accessToken', token);
  },
  getToken: () => {
    return sessionStorage.getItem('accessToken');
  },
  clearToken: () => {
    sessionStorage.removeItem('accessToken');
  },
  setRefreshToken: (token) => {
    sessionStorage.setItem('refreshToken', token);
  },
  getRefreshToken: () => {
    return sessionStorage.getItem('refreshToken');
  },
  clearRefreshToken: () => {
    sessionStorage.removeItem('refreshToken');
  },
  validateToken: () => {
    const token = auth.getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decodedToken.exp < now) {
          // Token expired
          auth.clearToken();
          auth.clearRefreshToken();
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.error('Token invalid:', error);
        auth.clearToken();
        auth.clearRefreshToken();
        return false;
      }
    } else {
      return false;
    }
  },
};

export default auth;