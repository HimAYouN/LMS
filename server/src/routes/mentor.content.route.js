import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { createSection } from "../controller/section.controller.js";
import { createLesson } from "../controller/lesson.controller.js";

const router = Router();


router.route("/courses/:courseId/sections").post(verifyJWT , authorizeRoles("mentor"),createSection)
router.route("/sections/:sectionId/lessons").post(verifyJWT , authorizeRoles("mentor"),createLesson)

export default router;
