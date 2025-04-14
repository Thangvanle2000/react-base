import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { getErrorMessage } from '../../../api';
import { getListUserApi } from '../../../api/home';
import { Constant } from '../../../common/constants';
import { UserState } from '../../../types/user';

// @ts-ignore
export const getListUser = createAsyncThunk(
  'admin/listUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getListUserApi();
      const { data, status } = response;
      if (status === Constant.DEFAULT_STATUS) {
        dispatch(setListUser(data));
        return true;
      }
    } catch (error: any) {
      dispatch(setListUser(error));
      return rejectWithValue(getErrorMessage(error));
    }
    return false;
  },
);

export const listUserSlice = createSlice({
  name: 'listUser',
  initialState: {
    error: false,
    loading: false,
    success: false,
    status: 0,
    message: '',
    listUser:[],
  } as UserState,
  reducers: {
    setListUser: (state: UserState, { payload }) => {
      state.listUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListUser.pending, (state: UserState) => {
      state.loading = true;
    });
    builder.addCase(getListUser.fulfilled, (state: UserState) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(getListUser.rejected, (state: UserState) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
 
  },
});

export const listUserSelector = (state: RootState) => state.listUser;
export const { setListUser } = listUserSlice.actions;
