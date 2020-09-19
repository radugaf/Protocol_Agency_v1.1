import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.argus.me/',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default instance;
