import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getQuizForStudent, submitQuiz } from "../controller/quizAttempt.contoller.js";

const router = Router();

router.route("/quizzes/:quizId").get(verifyJWT, authorizeRoles("student"), getQuizForStudent)
router.route("/quizzes/:quizId/submit").post(verifyJWT, authorizeRoles("student"), submitQuiz )


export default router;
