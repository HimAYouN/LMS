import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ROLE_REDIRECT = {
    student: '/student/dashboard',
    admin: '/admin/dashboard',
    mentor: '/mentor/dashboard',
};

const GuestRoute = ({ allowedRoles }) => {
    const { user, loading, logout } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Outlet />;
    }
    console.log("USER IN THE GUEST ROUTE: " , user.role, "ALLOWED ROLES: ", allowedRoles[0]);
    if (user && user.role === allowedRoles[0]) {
        return <Navigate to={ROLE_REDIRECT[user.role] || '/'} replace />;
    }
    logout()
    return <Outlet />;

   
};

export default GuestRoute;
