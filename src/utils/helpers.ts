import dayjs from "dayjs";
import { DataCookie } from "../types/common";

export const getCookie = (cookieName: string | undefined) => {
  if (!cookieName) {
    return;
  }
  const decodedCookie = decodeURIComponent(document.cookie);
  const listCookies = decodedCookie.split(";");
  for (let i = 0; i < listCookies.length; i++) {
    let cookie = listCookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length + 1, cookie.length);
    }
  }
  return "";
};

export const saveCookie = (dataCookie: DataCookie) => {
  if (!dataCookie?.name) {
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + dataCookie.expDay * 24 * 60 * 60 * 1000);
  document.cookie = `${dataCookie.name}=${
    dataCookie.value
  }; expires=${date.toUTCString()}; path=/;`;
};

export const deleteCookie = (nameCookie: string | undefined) => {
  if (!nameCookie) {
    return;
  }
  document.cookie = nameCookie + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const scrollTop = () =>
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

const countDecimals = (value: number) => {
  if (!value) return 0;
  if (value % 1 !== 0) return value?.toString()?.split(".")[1]?.length;
  return 0;
};

export const formattedPrice = (value: any) => {
  if (!value) {
    return 0;
  } else {
    return value.toLocaleString("en-US");
  }
};

export const removeVietnameseTones = (str: string) => {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  return str;
};

export function convertTimeFormat(timeString?: string) {
  if (!timeString) {
    return null;
  } else {
    const [hours, minutes] = timeString.split(":");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
}

export const convertMinutes = (totalMinutes: number): string => {
  if (!totalMinutes) {
    return "";
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
    return `${formattedHours}h${formattedMinutes}`;
  }
};

export const formatDate = (date: any, type: string) => {
  return dayjs(date).format(type);
};
