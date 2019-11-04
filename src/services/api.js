import axios from 'axios';

const api = axios.create({
  baseURL: 'https://elinfo.atlassian.net',
});

export default api;
