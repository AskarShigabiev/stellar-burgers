import { describe, test, expect } from '@jest/globals';
import userSliseReducer, {
  fetchCurrentUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile
} from '../slices/userS';

describe('редьюсер слайса user', () => {
  const userState = { ...initialState };

  test('начало загрузки текущего пользователя', () => {
    const action = { type: fetchCurrentUser.pending.type };
    const state = userSliseReducer(userState, action);

    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('');
  });

  test('успешная загрузка текущего пользователя', () => {
    const userData = { user: { name: 'Аскар', email: 'askar@example.com' } };
    const action = { type: fetchCurrentUser.fulfilled.type, payload: userData };
    const state = userSliseReducer(userState, action);
    expect(state.user).toEqual(userData.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('');
  });

  test('ошибка при загрузке текущего пользователя', () => {
    const action = {
      type: fetchCurrentUser.rejected.type,
      error: { message: 'Ошибка загрузки пользователя' }
    };
    const state = userSliseReducer(userState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки пользователя');
  });

  test('начало входа пользователя', () => {
    const action = { type: loginUser.pending.type };
    const state = userSliseReducer(userState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('');
  });

  test('успешный вход пользователя', () => {
    const userData = {
      user: { name: 'ask', email: 'shbiffewevaskefwear@gmail.com' }
    };
    const action = { type: loginUser.fulfilled.type, payload: userData };
    const state = userSliseReducer(userState, action);
    expect(state.user).toEqual(userData.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('ошибка при входе пользователя', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка входа' }
    };
    const state = userSliseReducer(userState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка входа');
  });

  test('начало регистрации пользователя', () => {
    const action = { type: registerUser.pending.type };
    const state = userSliseReducer(userState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('');
  });

  test('успешная регистрация пользователя', () => {
    const userData = {
      user: { name: 'ask_test', email: 'test_mail@gmail.com' }
    };
    const action = { type: registerUser.fulfilled.type, payload: userData };
    const state = userSliseReducer(userState, action);
    expect(state.user).toEqual(userData.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('ошибка при регистрации пользователя', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userSliseReducer(userState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  test('выход пользователя', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userSliseReducer(userState, action);
    expect(state.user).toBe(null);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('начало обновления профиля пользователя', () => {
    const action = { type: updateUserProfile.pending.type };
    const state = userSliseReducer(userState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(true);
  });

  test('успешное обновление профиля пользователя', () => {
    const userData = {
      user: { name: 'ask_test_1', email: 'test_mail@gmail.com' }
    };
    const action = {
      type: updateUserProfile.fulfilled.type,
      payload: userData
    };
    const state = userSliseReducer(userState, action);
    expect(state.user).toEqual(userData.user);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('');
  });

  test('ошибка при обновлении профиля пользователя', () => {
    const action = {
      type: updateUserProfile.rejected.type,
      error: { message: 'Ошибка обновления профиля' }
    };
    const state = userSliseReducer(userState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка обновления профиля');
  });
});
