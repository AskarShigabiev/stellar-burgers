import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSlice } from '../../services/slices/userS';

export const AppHeader: FC = () => {
  const currentUser = useSelector(userSlice.selectors.selectCurrentUser);

  return <AppHeaderUI userName={currentUser?.name} />;
};
