import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { RootState } from '../store';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  error: string | null;
  isLoading: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  error: null,
  isLoading: false,
  orderModalData: null
};

// создание заказа
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.bun = action.payload;
        else state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientPosition: (
      state,
      action: PayloadAction<{ index: number; newIndex: number }>
    ) => {
      const { index, newIndex } = action.payload;
      if (index >= 0 && newIndex >= 0 && newIndex < state.ingredients.length) {
        const [movedIngredient] = state.ingredients.splice(index, 1);
        state.ingredients.splice(newIndex, 0, movedIngredient);
      }
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      if (!action.payload) {
        state.bun = null;
        state.ingredients = [];
      }
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.isLoading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
        state.isLoading = false;
        state.error = null;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientPosition,
  setOrderModalData
} = constructorSlice.actions;

export const selectConstructorState = (state: RootState) =>
  state.constructorBurger;
export const selectIngredients = (state: RootState) =>
  state.constructorBurger.ingredients;
export const selectBun = (state: RootState) => state.constructorBurger.bun;
export const selectOrderModalData = (state: RootState) =>
  state.constructorBurger.orderModalData;
export const selectLoading = (state: RootState) =>
  state.constructorBurger.isLoading;
export const selectError = (state: RootState) => state.constructorBurger.error;

export default constructorSlice.reducer;
