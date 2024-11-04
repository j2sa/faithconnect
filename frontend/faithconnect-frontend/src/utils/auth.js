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
};

export default auth;