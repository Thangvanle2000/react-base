import axios, { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export const authApi: any = {
  async login(data: any): Promise<AxiosResponse<any>> {
    const url: string = "/auth/login";
    return axiosClient.post(url, data);
  },
  async register(data: any): Promise<AxiosResponse<any>> {
    const url: string = `auth/register`;
    return axiosClient.post(url, data);
  },
  async logout(params: any): Promise<AxiosResponse<any>> {
    const url: string = `/auth/logout${params ?? ""}`;
    return axiosClient.post(url);
  },
  async getUsers(): Promise<AxiosResponse<any>> {
    const url: string = `/users`;
    return axios.get(url);
  },
};
