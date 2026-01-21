import { Router } from "express";
import { getPublishedCourses , getCourseDetails } from "../controller/course.controller.js";

const router = Router();


router.route("/courses").get(getPublishedCourses)
router.route("/courses/:courseId").get(getCourseDetails)

export default router;
