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

export interface TUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string;
  isLoading: boolean;
}

export const initialUserState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: '',
  isLoading: false
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
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
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
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error?.message || '';
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error?.message || '';
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error?.message || '';
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = false;
      state.isLoading = false;
    });
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.error?.message || '';
        state.isLoading = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    selectCurrentUser: (state: TUserState) => state.user,
    selectAuthError: (state: TUserState) => state.error,
    selectIsAuthChecked: (state: TUserState) => state.isAuthChecked,
    selectUserisLoading: (state: TUserState) => state.isLoading
  }
});

export const {
  selectCurrentUser,
  selectAuthError,
  selectIsAuthChecked,
  selectUserisLoading
} = userSlice.selectors;

export default userSlice.reducer;
