import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { fetchFeedOrders, selectFeed } from '../../services/slices/feedS';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeed);

  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, []);

  const handleFeed = () => {
    dispatch(fetchFeedOrders());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleFeed} />;
};
