import { describe, test, expect } from '@jest/globals';
import feedSliseReducer, { initialState } from '../slices/feedS';

describe('тест ленты заказов', () => {
  const feedState = {
    ...initialState,
    error: null
  };

  test('лента заказов загружена', () => {
    const feedLoaded = {
      orders: [
        {
          _id: '671ea123d829be001c779411',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный метеоритный бургер',
          createdAt: '2024-10-27T20:22:59.436Z',
          updatedAt: '2024-10-27T20:23:01.235Z',
          number: 57818
        },
        {
          _id: '671ea0fdd829be001c779410',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2024-10-27T20:22:21.573Z',
          updatedAt: '2024-10-27T20:22:22.432Z',
          number: 57817
        },
        {
          _id: '671ea0ddd829be001c77940e',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный био-марсианский бургер',
          createdAt: '2024-10-27T20:21:49.142Z',
          updatedAt: '2024-10-27T20:21:51.017Z',
          number: 57816
        }
      ],
      total: 3,
      totalToday: 3
    };

    const action = {
      type: 'feed/fetchFeedOrders/fulfilled',
      payload: feedLoaded
    };

    const state = feedSliseReducer(feedState, action);
    expect(state.orders).toEqual(feedLoaded.orders);
    expect(state.total).toBe(feedLoaded.total);
    expect(state.totalToday).toBe(feedLoaded.totalToday);
    expect(state.error).toBe(null);
  });
});
