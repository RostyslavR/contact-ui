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
