"use client";
import { authApi } from "../../../../api/authApi.ts/page";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  listUser: [];
}
export interface LoginType {
  email: string;
  password: string;
}
const initialState: UserState = {
  loading: "idle",
  listUser: [],
};

export const getUsers: any = createAsyncThunk(
  "user/getUsers",
  async (): Promise<any> => {
    try {
      let res: any = await authApi.getUsers();
      return res;
    } catch (error: any) {}
  }
);
export const login: any = createAsyncThunk(
  "auth/login",
  async (data: LoginType): Promise<any> => {
    try {
      const res: any = await authApi.login(data);
      if (res.status === "success") {
        localStorage.setItem(
          "access_token",
          JSON.stringify(res?.data?.access_token.trim())
        );
        return res;
      }
    } catch (error: any) {
      if (error?.response?.status === 422) {
        return {
          status: false,
        };
      }
    }
  }
);

export const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
  },
});
const { reducer: userReducer } = userSlice;

export default userReducer;
