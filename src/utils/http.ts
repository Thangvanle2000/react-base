import axios, { AxiosError } from 'axios';
import { APP_CONFIG } from './env';
import { toast } from 'react-toastify';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {
  getAccessToken,
  destroyLogged,
  saveAuth,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from './jwt';
import { getCookie } from './helpers';

interface TypeObjKey {
  [key: string]: any;
}

const DEFAULT_HEADERS: TypeObjKey = {
  'Content-Type': 'application/json',
  'x-api-key': `${getCookie('API_KEY')}`,
};

const getAuthToken = (token: string | null) => `Bearer ${token}`;

axios.interceptors.request.use((request: any) => {
  request.headers['x-api-key'] = `${getCookie('API_KEY')}`;
  request.headers['Authorization'] = getAuthToken(getAccessToken());
  return request;
});

const refreshAuthLogic = async (
  failedRequest: AxiosError<{
    success?: boolean;
    message: string;
    errors: any;
  }>,
) => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      const response = await axios.post(
        `${APP_CONFIG.apiUrl}refresh`,
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
        saveRefreshToken(data?.refresh_token);
        axios.defaults.headers.common['Authorization'] =
          `Bearer ${data?.access_token}`;
      }
      return await Promise.resolve();
    } catch {
      destroyLogged();
      saveAuth(null);
      return await Promise.reject();
    }
  }
  destroyLogged();
  saveAuth(null);
  return await Promise.reject(failedRequest);
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);

class HttpService {
  constructor() {
    // Set Header Auth for all APi
  }
  configRequest(multipart = false, optionsFile: any = {}) {
    let defaultHeaders = DEFAULT_HEADERS;
    // Set header for file
    if (multipart) {
      defaultHeaders = {};
    }
    if (getAccessToken()) {
      defaultHeaders = {
        Authorization: `Bearer ${getAccessToken()}`,
        Accept: 'application/json',
        Cache: 'no-cache',
        common: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        ...defaultHeaders,
      };
    }
    return {
      headers: defaultHeaders,
      ...optionsFile,
    };
  }

  querySearch(params: TypeObjKey = {}): string {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  get(apiEndpoint: string, params = {}): Promise<any> {
    if (Object.keys(params)?.length > 0) {
      apiEndpoint = `${apiEndpoint}?${this.querySearch(params)}`;
    }
    return axios
      .get(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest())
      .then(
        (res: any) => {
          return res?.data;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        },
      );
  }

  post(apiEndpoint: string, payload: any): Promise<any> {
    return axios
      .post(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest())
      .then(
        (res: any) => {
          return res;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        },
      );
  }

  put(apiEndpoint: string, payload: any): Promise<any> {
    return axios
      .put(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest())
      .then(
        (res: any) => {
          return res?.data;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        },
      );
  }

  delete(apiEndpoint: string): Promise<any> {
    return axios
      .delete(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest())
      .then(
        (res: any) => {
          return res?.data;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        },
      );
  }

  deleteMulti(apiEndpoint: string, payload: number[]): Promise<any> {
    return axios
      .delete(APP_CONFIG.apiUrl + apiEndpoint, {
        data: { ids: payload },
        ...this.configRequest(),
      })
      .then(
        (res: any) => {
          return res?.data;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        },
      );
  }

  async uploadFile(
    apiEndpoint: string,
    fileData: any,
    settingOptions: any,
    isMap = false,
  ): Promise<any> {
    if (!fileData) {
      toast.error('Bạn chưa chọn file để tải lên!');
      return;
    }
    let formData = fileData;
    if (isMap) {
      formData = await this.mapFilePayload(fileData);
    }
    if (formData) {
      return axios
        .post(
          APP_CONFIG.apiUrl + apiEndpoint,
          formData,
          this.configRequest(true, settingOptions),
        )
        .then(
          (res: any) => {
            return res?.data;
          },
          (error: AxiosError) => {
            return Promise.reject(error);
          },
        );
    }
  }

  mapFilePayload(data: any) {
    const formData = new FormData();
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
      return false;
    });
    return formData;
  }

  async handleError(err: any) {
    let errorContent = '';
    if (!err) {
      toast.error(errorContent || 'Có lỗi xảy ra!');
    }
    switch (err?.status) {
      case 403:
        window.location.href = '/login';
        break;
      default:
        break;
    }
    if (Array.isArray(err) && err?.length > 0) {
      err?.map((item) => (errorContent += item?.message));
    } else {
      errorContent = err?.data?.message ? err?.data?.message : err?.data?.error;
    }
    toast.error(errorContent || 'Có lỗi xảy ra!');
    return err;
  }
}

export default new HttpService();
