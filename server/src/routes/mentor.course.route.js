import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {createCourse, getMyCourses, changeCourseStatus, updateCourse, getMentorCourseDetails, deleteCourse} from "../controller/mentorCourse.controller.js";

const router = Router();


router.route("/courses").post(verifyJWT, authorizeRoles("mentor"),createCourse)
router.route("/courses").get(verifyJWT, authorizeRoles("mentor"),getMyCourses)
router.route("/courses/:courseId").patch(verifyJWT, authorizeRoles("mentor"),updateCourse)
router.route("/courses/:courseId/status").patch(verifyJWT, authorizeRoles("mentor"),changeCourseStatus)
router.route("/courses/:courseId").get(verifyJWT, authorizeRoles("mentor"),getMentorCourseDetails)
router.route("/courses/:courseId").delete(verifyJWT , authorizeRoles("mentor"), deleteCourse)

export default router;
