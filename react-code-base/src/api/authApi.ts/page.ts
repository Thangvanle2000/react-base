"use client";
import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export const authApi: any = {
  async login(data: any): Promise<AxiosResponse<any>> {
    const url: string = "/users/login";
    return axiosClient.post(url, data);
  },
  async register(data: any): Promise<AxiosResponse<any>> {
    const url: string = `/users`;
    return axiosClient.post(url, data);
  },
  async logout(params: any): Promise<AxiosResponse<any>> {
    const url: string = `/auth/logout${params ?? ""}`;
    return axiosClient.post(url);
  },
  async profile(): Promise<AxiosResponse<any>> {
    const url: string = `/auth/profile`;
    return axiosClient.get(url);
  },
};
