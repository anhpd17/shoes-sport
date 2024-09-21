import { useAuth } from '@/hooks/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
