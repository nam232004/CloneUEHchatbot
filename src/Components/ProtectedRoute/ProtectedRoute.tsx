import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../Hooks/Hooks';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { token } = useAppSelector(state => state.auth);
    const location = useLocation();

    if (!token) {
        // Redirect to auth page but save the attempted location
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // If we're at auth page and have a token, redirect to chat
    if (token && location.pathname === '/auth') {
        return <Navigate to="/chat" replace />;
    }

    return <>{children}</>;
}; 