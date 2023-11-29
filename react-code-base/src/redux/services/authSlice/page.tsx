import { authApi } from "@/api/authApi.ts/page";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  tokenRegister: {};
  listUser: any[]; // Update this line
}
export const login: any = createAsyncThunk(
  "auth/login",
  async (data: any): Promise<any> => {
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
export const register: any = createAsyncThunk(
  "auth/register",
  async (data: any): Promise<any> => {
    try {
      const res: any = await authApi.register(data);
    } catch (error: any) {
      if (error?.response?.status === 422) {
        return {
          status: false,
        };
      }
    }
  }
);

export const getUser: any = createAsyncThunk(
  "auth/getUser",
  async (): Promise<any> => {
    try {
      const res: any = await authApi.getUsers();
      return res;
    } catch (error: any) {}
  }
);

const authSlice = createSlice({
  name: "users",
  initialState: {
    loading: "idle",
    tokenRegister: {},
    listUser: {},
  } as AuthState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.listUser = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.tokenRegister = action.payload.token;
    });
  },
});
const { reducer: authReducer } = authSlice;

export default authReducer;
