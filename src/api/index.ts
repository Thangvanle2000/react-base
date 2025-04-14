import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { destroyLogged, getAccessToken, getRefreshToken, saveAccessToken } from '../utils/jwt';
import { APP_CONFIG } from '../utils/env';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const BASE_URL = import.meta.env.VITE_API_URL;
export const BASE_URL_MANAGER = import.meta.env.VITE_API_MANAGER;
export const BASE_URL_IMG = import.meta.env.VITE_URL;
export const SERVE_URL_IMG = import.meta.env.VITE_SERVE_URL;

type Error = {
  data: any;
  message: string;
  errors?: any;
};

export const getAxiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    Accept: 'application/json',
    Cache: 'no-cache',
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
});

function getAuthToken(token: string | null) {
  return `Bearer ${token}`;
}

getAxiosClient.interceptors.request.use((request) => {
  request.headers['Authorization'] = getAuthToken(getAccessToken());
  return request;
});

const refreshAuthLogic = async (failedRequest: AxiosError<{ success?: boolean; message: string }>) => {
  if (
    failedRequest?.response?.data?.message === 'Tài khoản hoặc mật khẩu không chính xác' ||
    failedRequest?.response?.data?.message === 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên.'
  ) {
    return failedRequest;
  }
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      const response = await axios.post(
        `${APP_CONFIG.apiUrl}/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getRefreshToken()}`,
            Accept: 'application/json',
            Cache: 'no-cache',
            'Content-Type': 'application/json',
            'Refresh-Token': getRefreshToken(),
          },
        },
      );
      const { data } = response;
      if (data) {
        saveAccessToken(data?.access_token);
        getAxiosClient.defaults.headers.common['Authorization'] = `Bearer ${data?.access_token}`;
      }
      return await Promise.resolve();
    } catch {
      destroyLogged();
      // saveAuth(null);
      window.location.href = '/login';
      return await Promise.reject();
    }
  }
  destroyLogged();
  window.location.href = '/login';
  return await Promise.reject();
};

export const getAxiosClientWithToken = (refreshToken?: boolean) => {
  return getAxiosClient;
};

createAuthRefreshInterceptor(getAxiosClient, refreshAuthLogic);

export const getErrorMessage = (error: AxiosError) => {
  const { status } = error.response || {};
  const { data: errors, errors: validateErrors, message } = error.response?.data as Error;
  if (status && status === 422) {
    return validateErrors ?? errors ?? message;
  }
  if (status && status === 403) {
    return validateErrors ?? errors ?? message;
  }
  if (status && status < 500) {
    return message;
  }

  return 'Server Error';
};

export const checkAuthorization = (error: any) => {
  const { status } = error?.response || {};
  if (status === 401) {
    toast.error('Hết hạn token');
  } else {
    let textError: any = error?.response?.data?.message;
    let listError: any = error?.response?.data?.errors;

    let lengthErrors: number = 0;
    if (typeof listError === 'object' && listError) {
      lengthErrors = Object.keys(listError).length;
    }

    if (listError && lengthErrors > 0) {
      Object.keys(listError).forEach((fieldName) => {
        toast.error(`${[listError[fieldName]]}`);
      });
    } else {
      const messageError = textError?.replace(/\((.*?)\)/, ''); // Thay thế "(and 5 more error)" bằng ""
      toast.error(messageError);
    }
  }
  return 'Lỗi hệ thống';
};
