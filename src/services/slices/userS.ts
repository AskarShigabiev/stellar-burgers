import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';
import { RootState } from '../store';

export interface TUserState {
  user?: TUser | null;
  isAuthChecked: boolean;
  error?: string;
  isLoading: boolean;
}

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: ''
};

export const fetchCurrentUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response;
});

// вход пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

// регистрация пользователя
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

// выход пользователя
export const logoutUser = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return response;
});

// обновления данных пользователя
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<TRegisterData>) => {
    const response = await updateUserApi(profileData);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = true;
      state.isLoading = false;
    });
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isAuthChecked = true;
        state.error = '';
        state.isLoading = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
  }
});

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectAuthError = (state: RootState) => state.user.error;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUserLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
