import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import { describe, test } from '@jest/globals';

describe('проверка правильной инициализации rootReducer', () => {
  test('корректная инициализация', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();
    expect(initialState).toEqual(
      rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });

  test('возвращает корректное начальное состояние ', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(
      rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
