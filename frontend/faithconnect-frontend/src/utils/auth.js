const auth = {
    setToken: (token) => {
      localStorage.setItem('token', token);
    },
    getToken: () => {
      return localStorage.getItem('token');
    },
    clearToken: () => {
      localStorage.removeItem('token');
    },
  };
  
  export default auth;
  