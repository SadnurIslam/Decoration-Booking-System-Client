import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';
import { Navigate } from 'react-router';

const DecoratorRoute = ({children}) => {
    const { role, isLoading } = useRole();

    if (isLoading) return <LoadingSpinner />;
    if (role !== "decorator") return <Navigate to="/" replace />;

    return children;
};

export default DecoratorRoute;