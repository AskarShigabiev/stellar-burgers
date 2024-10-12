import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthChecked } from '../../services/slices/userS';
import {
  clearIngredients,
  selectConstructorState
} from '../../services/slices/constructor';
import {
  closeModal,
  createOrder,
  selectModalData,
  selectOrderRequest
} from '../../services/slices/orderS';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectIsAuthChecked);
  const constructorItems = useSelector(selectConstructorState);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
    dispatch(clearIngredients());
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
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
