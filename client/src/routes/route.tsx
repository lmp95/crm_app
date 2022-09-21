import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { Navigate, Routes, Route } from 'react-router-dom';
import CustomerList from '../pages/customerList';
import AddNewCustomer from '../pages/addNewCustomer';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: RootState) => state.user);
  return token ? children : <Navigate to={'/login'} replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <CustomerList /> } />
      <Route path='/addNewCustomer' element={ <AddNewCustomer /> } />
    </Routes>
  );
};