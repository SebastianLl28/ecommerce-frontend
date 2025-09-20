import { ENV } from '@/config/env';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

