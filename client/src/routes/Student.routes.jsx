import React from 'react';
import GuestRoute from './auth/GuestRoute';
import ProtectedRoute from './auth/ProtectedRoute';
import { Route } from 'react-router-dom';

//IMPORTING STUDENT COMPONENTS/PAGES
const StudentAuth = React.lazy(
    () => import('../pages/auth/student/StudentAuth')
);
const StudentRegister = React.lazy(
    () => import('../pages/auth/student/StudentRegister')
);
const StudentVerify = React.lazy(
    () => import('../pages/auth/student/StudentVerification')
);
const StudentDashboard = React.lazy(
    () => import('../pages/student/dashboard/Dashboard')
);
const StudentProfile = React.lazy(
    () => import('../pages/student/profile/StudentProfile')
);
const StudentCourses = React.lazy(
    () => import('../pages/student/courses/StudentCourses')
);
const StudentUpdateDetails = React.lazy(
    () => import('../pages/auth/student/StudentUpdateDetails')
);

const StudentRoutes = () => (
    <>
        {/* STUDENT ROUTES */}
        <Route element={<GuestRoute allowedRoles={['student']}  />}>
            <Route path="/student/login" element={<StudentAuth />} />
            <Route path="/student/verify" element={<StudentVerify />} />
            <Route path="/student/register" element={<StudentRegister />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/courses" element={<StudentCourses />} />
            <Route
                path="/student/update-profile"
                element={<StudentUpdateDetails />}
            />
        </Route>
    </>
);

export default StudentRoutes;
