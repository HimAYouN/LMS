import React from 'react';
import { Route } from 'react-router-dom';
import GuestRoute from './auth/GuestRoute';
import ProtectedRoute from './auth/ProtectedRoute';

const MentorAuth = React.lazy(() => import('../pages/auth/mentor/MentorAuth'));
const MentorDashboard = React.lazy(
    () => import('../pages/mentor/dashboard/MentorDashboard')
);
const MentorCourses = React.lazy(
    () => import('../pages/mentor/courses/Courses')
);
const MentorOneCourse = React.lazy(
    () => import('../pages/mentor/courses/OneCourse')
);
const MentorCreateCourses = React.lazy(
    () => import('../pages/mentor/courses/CreateCourses')
);
const AddLesson = React.lazy(
    () => import('../pages/mentor/courses/AddLesson')
);
const AddSection = React.lazy(
    () => import('../pages/mentor/courses/AddSection')
);
const AddQuiz = React.lazy(
    () => import('../pages/mentor/courses/AddQuiz')
);
const UpdateCourse = React.lazy(
    () => import('../pages/mentor/courses/UpdateCourse')
);
const SeeQuizzes = React.lazy(
    () => import('../pages/mentor/courses/SeeQuizzes')
);
const SeeEnrollments = React.lazy(
    () => import('../pages/mentor/courses/SeeEnrollments')
);


const MentorRoutes = () => (
    <>
        {/*  MENTOR ROUTES */}
        <Route element={<GuestRoute allowedRoles={['mentor']} />}>
            <Route path="/mentor/login" element={<MentorAuth />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['mentor']} />}>
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
            <Route path="/mentor/createCourse" element={<MentorCreateCourses />} />
            <Route path="/mentor/course/:courseId" element={<MentorOneCourse />} />
            <Route path="/mentor/course/updatecourse/:courseId" element={<UpdateCourse />} />
            <Route path="/mentor/course/:courseId/addlesson/:sectionId" element={<AddLesson />} />
            <Route path="/mentor/course/addsection/:courseId" element={<AddSection />} />
            <Route path="/mentor/course/:courseId/addquiz" element={<AddQuiz />} />
            <Route path="/mentor/course/:courseId/seequizzes" element={<SeeQuizzes />} />
            <Route path="/mentor/course/:courseId/enrollments" element={<SeeEnrollments />} />
        </Route>
    </>
);

export default MentorRoutes;
