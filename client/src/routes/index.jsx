import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const IndexPage = React.lazy(() =>
  import("../pages/role-selection/RoleSelection")
);

// IMPORTING MENTOR COMPONENTS/PAGES
const MentorAuth = React.lazy(() => 
  import("../pages/auth/mentor/MentorAuth")
);
const MentorDashboard = React.lazy(() =>
  import("../pages/mentor/dashboard/MentorDashboard")
);

//IMPORTING STUDENT COMPONENTS/PAGES
const StudentAuth = React.lazy(() =>
  import("../pages/auth/student/StudentAuth")
);
const StudentRegister = React.lazy(() =>
  import("../pages/auth/student/StudentRegister")
);
const StudentVerify = React.lazy(() =>
  import("../pages/auth/student/StudentVerification")
);
const StudentDashboard = React.lazy(() =>
  import("../pages/student/dashboard/Dashboard")
);
const StudentProfile = React.lazy(() =>
  import("../pages/student/profile/StudentProfile")
);
const StudentCourses = React.lazy(() =>
  import("../pages/student/courses/StudentCourses")
);

//IMPORTING ADMIN PAGES/COMPONENTS
const AdminAuth = React.lazy(() => 
  import("../pages/auth/admin/AdminAuth")
);
const AdminDashboard = React.lazy(() =>
  import("../pages/admin/dashboard/AdminDashboard")
);

const AppRoutes = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<IndexPage />} />

          {/* STUDENT ROUTES */}
          <Route path="/student/login" element={<StudentAuth />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/verify" element={<StudentVerify />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/Courses" element={<StudentCourses />} />
          {/* <Route path="*" element={<NotFound />} /> */}

          {/*  MENTOR ROUTES */}
          <Route path="/mentor/login" element={<MentorAuth />} />
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default AppRoutes;
