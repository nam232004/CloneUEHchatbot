import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../Components/Hooks/Hooks';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { token } = useAppSelector(state => state.auth);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (token && location.pathname === '/auth') {
        return <Navigate to="/chat" replace />;
    }

    return <>{children}</>;
};