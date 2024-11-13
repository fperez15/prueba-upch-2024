import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com/users',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default apiClient;
