import { describe, test, expect } from '@jest/globals';
import constructorSliceReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientPosition,
  clearIngredients
} from '../slices/constructor';
import { nanoid } from '@reduxjs/toolkit';

describe('тест конструктора', () => {
  const constructorState = {
    bun: null,
    ingredients: [
      {
        id: nanoid(),
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      },
      {
        id: nanoid(),
        _id: '643d69a5c3f7b9001cfa094a',
        name: 'Сыр с астероидной плесенью',
        type: 'main',
        proteins: 84,
        fat: 48,
        carbohydrates: 420,
        calories: 3377,
        price: 4142,
        image: 'https://code.s3.yandex.net/react/code/cheese.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png'
      }
    ],
    orderModalData: null
  };

  test('добавления ингредиента(булка)', () => {
    const state = constructorSliceReducer(
      constructorState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      })
    );
    expect(state.bun).toEqual({
      id: expect.any(String),
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    });
  });

  test('добавления ингредиента(содержимое)', () => {
    const state = constructorSliceReducer(
      constructorState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      })
    );
    expect(state.ingredients).toEqual([
      ...constructorState.ingredients,
      {
        id: expect.any(String),
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      }
    ]);
  });

  test('изменения порядка ингредиентов', () => {
    const state = constructorSliceReducer(
      constructorState,
      moveIngredientPosition({ index: 0, newIndex: 1 })
    );
    expect(state.ingredients).toEqual([
      constructorState.ingredients[1],
      constructorState.ingredients[0]
    ]);
  });

  test('удаление ингредиента', () => {
    const removeIngredientId = constructorState.ingredients[1].id;
    const state = constructorSliceReducer(
      constructorState,
      removeIngredient(removeIngredientId)
    );
    expect(state.ingredients).toEqual([constructorState.ingredients[0]]);
  });

  test('очистка конструктора', () => {
    const state = constructorSliceReducer(constructorState, clearIngredients());
    expect(state.ingredients).toEqual([]);
    expect(state.bun).toBeNull();
  });
});
