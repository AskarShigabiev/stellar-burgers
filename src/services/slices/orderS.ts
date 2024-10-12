import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi, orderBurgerApi } from '@api';
import { RootState } from '../store';

export interface TOrderState {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error?: string | null;
}

export const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
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
  name: 'orders',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error?.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    // .addCase(fetchOrders.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error?.message || null;
    // })
    // .addCase(fetchOrders.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    builder
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(getOrderById.pending, (state) => {
        state.error = null;
        state.orderModalData = null;
      });
  }
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrderRequest = (state: RootState) =>
  state.orders.orderRequest;
export const selectModalData = (state: RootState) =>
  state.orders.orderModalData;
export const selectError = (state: RootState) => state.orders.error;

export const { closeModal } = orderSlice.actions;

export default orderSlice.reducer;
