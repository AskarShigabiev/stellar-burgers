import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthChecked } from '../../services/slices/userS';
import {
  createOrder,
  selectConstructorState,
  selectLoading,
  selectOrderModalData,
  setOrderModalData
} from '../../services/slices/constructor';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectIsAuthChecked);
  const constructorItems = useSelector(selectConstructorState);
  const orderRequest = useSelector(selectOrderModalData);
  const orderModalData = useSelector(selectLoading);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={constructorItems.isLoading}
      constructorItems={constructorItems}
      orderModalData={constructorItems.orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
