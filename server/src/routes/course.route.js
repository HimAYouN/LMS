import { Router } from "express";
import { getPublishedCourses } from "../controller/course.controller.js";

const router = Router();

// Public / student route
// router.get("/courses", getPublishedCourses);
router.route("/courses").get(getPublishedCourses)

export default router;
