import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectCurrentUser,
  selectIsAuthChecked
} from '../../services/slices/userS';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: TProtectedRouteProps) => {
  const location = useLocation();
  // const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectCurrentUser);

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
