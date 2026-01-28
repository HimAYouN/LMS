import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { createSection, deleteSection, reorderSections, updateSection } from "../controller/section.controller.js";
import { createLesson, deleteLesson, reorderLessons, updateLesson } from "../controller/lesson.controller.js";
import { createQuiz, deleteQuiz, getCourseQuizzes } from "../controller/quiz.controller.js";

const router = Router();

// Section Routes
router.route("/courses/:courseId/sections").post(verifyJWT , authorizeRoles("mentor"),createSection)
router.route("/sections/reorder").patch(verifyJWT , authorizeRoles("mentor"),reorderSections)
router.route("/sections/:sectionId").patch(verifyJWT , authorizeRoles("mentor"),updateSection)
router.route("/sections/:sectionId").delete(verifyJWT , authorizeRoles("mentor"),deleteSection)

// Lesson Routes
router.route("/sections/:sectionId/lessons").post(verifyJWT , authorizeRoles("mentor"),createLesson)
router.route("/lessons/reorder").patch(verifyJWT , authorizeRoles("mentor"),reorderLessons)
router.route("/lessons/:lessonId").patch(verifyJWT , authorizeRoles("mentor"), updateLesson)
router.route("/lessons/:lessonId").delete(verifyJWT , authorizeRoles("mentor"), deleteLesson)

// Quiz Routes
router.route("/courses/:courseId/quizzes").post(verifyJWT, authorizeRoles("mentor"), createQuiz)
router.route("/courses/:courseId/quizzes").get(verifyJWT, authorizeRoles("mentor"), getCourseQuizzes)
router.route("/quizzes/:quizId").delete(verifyJWT, authorizeRoles("mentor"), deleteQuiz)




export default router;
