import { APP_CONFIG } from './env';
import { deleteCookie, getCookie, saveCookie } from './helpers';

export const getAccessToken = () => {
  return getCookie(APP_CONFIG.accessToken) || null;
};

export const getRefreshToken = () => {
  return getCookie(APP_CONFIG.refreshToken) || null;
};

export const getAuth = () => {
  return getCookie(APP_CONFIG.profile)?.toString() || null;
};

export const saveAuth = (auth: any, expDay = 1) => {
  saveCookie({
    name: APP_CONFIG.profile as string,
    value: JSON.stringify(auth),
    expDay,
  });
};

export const saveAccessToken = (accessToken: string, expDay = 1) => {
  saveCookie({
    name: APP_CONFIG.accessToken as string,
    value: accessToken,
    expDay,
  });
};

export const saveRefreshToken = (refreshToken: string, expDay = 30) => {
  saveCookie({
    name: APP_CONFIG.refreshToken as string,
    value: refreshToken,
    expDay,
  });
};

export const destroyLogged = () => {
  deleteCookie(APP_CONFIG.accessToken);
  deleteCookie(APP_CONFIG.refreshToken);
  localStorage.clear();
};

export const checkLogin = () => {
  const token = getCookie(APP_CONFIG.accessToken);
  return !!(token || null);
};
