import React from 'react';
import { Route } from 'react-router-dom';
import GuestRoute from './auth/GuestRoute';
import ProtectedRoute from './auth/ProtectedRoute';


const AdminAuth = React.lazy(() => import('../pages/auth/admin/AdminAuth'));
const AdminDashboard = React.lazy(
    () => import('../pages/admin/dashboard/AdminDashboard')
);

const AdminRoutes = () => (
    <>
        <Route element={<GuestRoute allowedRoles={['admin']} />}>
            <Route path="/admin/login" element={<AdminAuth />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* <Route path="/admin/users" element={< />} /> */}
        </Route>
    </>
);
export default AdminRoutes;
