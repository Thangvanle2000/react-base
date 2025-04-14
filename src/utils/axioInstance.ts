import axios from 'axios';
import { APP_CONFIG } from './env';

export const axiosKeyNoToken = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const axiosCMSToken = axios.create({
//   baseURL: import.meta.env.VITE_BOOKING_API_CMS,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });