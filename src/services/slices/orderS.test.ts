import { describe, test, expect } from '@jest/globals';
import orderSliseReducer, {
  createOrder,
  fetchOrders,
  getOrderById,
  initialState
} from '../slices/orderS';

describe('тест заказов', () => {
  const orderState = {
    ...initialState,
    error: null
  };

  test('начинается создание заказа', () => {
    const action = { type: createOrder.pending.type };
    const state = orderSliseReducer(orderState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBe(null);
  });

  test('заказ успешно создан', () => {
    const orderData = {
      order: {
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
      }
    };
    const action = { type: createOrder.fulfilled.type, payload: orderData };
    const state = orderSliseReducer(orderState, action);

    expect(state.orderModalData).toEqual(orderData.order);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(null);
  });

  test('ошибка при создании заказа', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = orderSliseReducer(orderState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });

  test('заказы успешно загружены', () => {
    const ordersData = [
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
    ];
    const action = { type: fetchOrders.fulfilled.type, payload: ordersData };
    const state = orderSliseReducer(orderState, action);

    expect(state.orders).toEqual(ordersData);
  });

  test('успешно загружен заказ по id', () => {
    const orderData = {
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
        }
      ]
    };
    const action = { type: getOrderById.fulfilled.type, payload: orderData };
    const state = orderSliseReducer(orderState, action);

    expect(state.orderModalData).toEqual(orderData.orders[0]);
  });

  test('ошибка при загрузке заказа по id', () => {
    const action = {
      type: getOrderById.rejected.type,
      error: { message: 'Ошибка загрузки заказа' }
    };
    const newState = orderSliseReducer(orderState, action);

    expect(newState.error).toBe('Ошибка загрузки заказа');
  });

  test('начинается загрузка заказа по id', () => {
    const action = { type: getOrderById.pending.type };
    const state = orderSliseReducer(orderState, action);

    expect(state.orderModalData).toBe(null);
    expect(state.error).toBe(null);
  });
});
