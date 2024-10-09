import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi, orderBurgerApi } from '@api';

export interface TOrderState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  orderModalData: TOrder | null;
  loading: boolean;
  orderRequest: boolean;
  error?: string | null;
}

export const initialState: TOrderState = {
  orders: [],
  currentOrder: null,
  orderModalData: null,
  loading: false,
  orderRequest: false,
  error: null
};

// получение всех заказов
export const fetchOrders = createAsyncThunk('orders/getAll', async () => {
  const response = await getOrdersApi();
  return response;
});

// создание заказа
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData: string[]) => {
    const response = await orderBurgerApi(orderData);
    return response;
  }
);

// заказ по id
export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id: number) => {
    const response = await getOrderByNumberApi(id);
    return response;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error?.message || null;
      });
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || null;
      });
    builder
      .addCase(getOrderById.pending, (state) => {
        state.currentOrder = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || null;
      });
  },
  selectors: {
    selectOrders: (state: TOrderState) => state.orders,
    selectCurrentOrder: (state: TOrderState) => state.currentOrder,
    selectLoading: (state: TOrderState) => state.loading,
    selectOrderRequest: (state: TOrderState) => state.orderRequest,
    selectModalData: (state: TOrderState) => state.orderModalData,
    selectError: (state: TOrderState) => state.error
  }
});

export const {
  selectOrders,
  selectCurrentOrder,
  selectLoading,
  selectOrderRequest,
  selectModalData,
  selectError
} = orderSlice.selectors;

export const { closeModal } = orderSlice.actions;

export default orderSlice.reducer;
