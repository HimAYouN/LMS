import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { enrollInCourse, getMyEnrollments } from "../controller/enrollment.controller.js";
import { getCourseEnrollments } from "../controller/mentorEnrollment.controller.js";

const router = Router();




router.route("/courses/:courseId/enroll").post(verifyJWT, authorizeRoles("student"), enrollInCourse)
router.route("/my-enrollments").get(verifyJWT, authorizeRoles("student"), getMyEnrollments)
router.route("/courses/:courseId/enrollments").get(verifyJWT, authorizeRoles("mentor"),getCourseEnrollments)

export default router;
