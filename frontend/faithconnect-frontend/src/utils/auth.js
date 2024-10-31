import Cookies from 'js-cookie';

const auth = {
  setToken: (token) => {
    Cookies.set('accessToken', token, { expires: 1 }); // Expira em 1 dia
  },
  getToken: () => {
    return Cookies.get('accessToken');
  },
  clearToken: () => {
    Cookies.remove('accessToken');
  },
  setRefreshToken: (token) => {
    Cookies.set('refreshToken', token, { expires: 7 }); // Expira em 7 dias
  },
  getRefreshToken: () => {
    return Cookies.get('refreshToken');
  },
  clearRefreshToken: () => {
    Cookies.remove('refreshToken');
  },
};

export default auth;
