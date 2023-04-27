import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const GuardedRoute = ({ auth, redirect }: any) => {
  return auth ? <Outlet /> : <Navigate to={redirect} replace />;
}

export default GuardedRoute;