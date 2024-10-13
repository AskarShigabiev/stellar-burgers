import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';
import { RootState } from '../store';

export type TFeedState = {
  orders: TOrder[];
  error?: string | null;
  total: number;
  totalToday: number;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

// получение данных
export const fetchFeedOrders = createAsyncThunk(
  'feed/fetchFeedOrders',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.rejected, (state, action) => {
        state.orders = [];
        state.error = action.error?.message;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalToday = action.payload.totalToday;
        state.total = action.payload.total;
      });
  }
});

export const selectFeed = (state: RootState) => state.feed.orders;
export const selectTotal = (state: RootState) => state.feed.total;
export const selectTotalToday = (state: RootState) => state.feed.totalToday;
export const selectFeedError = (state: RootState) => state.feed.error;

export default feedSlice.reducer;
