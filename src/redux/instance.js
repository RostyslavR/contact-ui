import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

const setToken = token => {
  token
    ? (instance.defaults.headers.authorization = `Bearer ${token}`)
    : (instance.defaults.headers.authorization = '');
};

export { instance, setToken };

// const setToken = token => {
//   if (token) {
//     return (instance.defaults.headers.authorization = `Bearer ${token}`);
//   }
//   instance.defaults.headers.authorization = '';
// };

// // axios.defaults.baseURL = 'http://localhost:3300/';
// axios.defaults.baseURL = 'https://contact-server-002g.onrender.com/';

// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };
