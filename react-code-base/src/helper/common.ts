import { NotificationInstance } from "antd/es/notification/interface";
import CryptoJS from "crypto-js";

export const setLocalStorage = (key: string, value: any): void => {
  const tmpData: string = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    process.env.REACT_APP_HASH_KEY!
  ).toString();
  localStorage.setItem(key, tmpData);
};

export const getLocalStorage = (key: string): any => {
  const itemStr: string | null = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const tmpData: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(
    itemStr === null || itemStr === undefined ? "" : itemStr,
    process.env.REACT_APP_HASH_KEY!
  );

  const item = JSON?.parse(tmpData?.toString(CryptoJS.enc.Utf8));
  return item;
};
export const alertSuccess = (
  api: NotificationInstance,
  message: string
): void => {
  api.success({
    message,
    placement: "topRight",
    duration: 1,
  });
};

export const alertFail = (api: NotificationInstance, message: string): void => {
  api.error({
    message,
    placement: "topRight",
    duration: 3,
  });
};

export function downloadBlob(
  content: any,
  filename: any,
  contentType: any
): void {
  // Create a blob
  var blob: any = new Blob([content], { type: contentType });
  var url: string = URL.createObjectURL(blob);

  // Create a link to download it
  var pom: any = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", filename);
  pom.click();
}
