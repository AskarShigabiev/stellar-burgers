import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import constructorReducer from '../services/slices/constructor';
import userReducer from '../services/slices/userS';
import orderReducer from '../services/slices/orderS';
import ingredientsReducer from '../services/slices/ingredient';
import feedReducer from '../services/slices/feedS';

const rootReducer = combineReducers({
  constructorBurger: constructorReducer,
  user: userReducer,
  orders: orderReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
