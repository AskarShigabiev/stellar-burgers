import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export type TFeedState = {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

// получение данных фида
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
      .addCase(fetchFeedOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      });
  },
  selectors: {
    selectFeed: (state: TFeedState) => state.feed,
    selectFeedOrders: (state: TFeedState) => state.feed.orders,
    selectTotalOrders: (state: TFeedState) => state.feed.total,
    selectTotalTodayOrders: (state: TFeedState) => state.feed.totalToday,
    selectFeedLoading: (state: TFeedState) => state.isLoading,
    selectFeedError: (state: TFeedState) => state.error
  }
});

export const {
  selectFeed,
  selectFeedOrders,
  selectTotalOrders,
  selectTotalTodayOrders,
  selectFeedLoading,
  selectFeedError
} = feedSlice.selectors;

export default feedSlice.reducer;
