import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../services/slices/userS';

export const AppHeader: FC = () => {
  const currentUser = useSelector(selectCurrentUser);

  return <AppHeaderUI userName={currentUser?.name} />;
};
