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
  error?: string | null;
  orderModalData: TOrder | null;
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  error: null,
  orderModalData: null
};

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
    clearIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const selectConstructorState = (state: RootState) =>
  state.constructorBurger;
export const selectIngredients = (state: RootState) =>
  state.constructorBurger.ingredients;
export const selectBun = (state: RootState) => state.constructorBurger.bun;

export const {
  addIngredient,
  removeIngredient,
  moveIngredientPosition,
  clearIngredients
} = constructorSlice.actions;

export default constructorSlice.reducer;
