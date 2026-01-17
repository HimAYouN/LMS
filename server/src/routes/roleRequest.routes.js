import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { requestMentorRole,getRoleRequests,approveMentorRequest,rejectMentorRequest } from "../controller/roleRequest.controller.js";

const router = Router();


router.route("/request-mentor").post(verifyJWT,authorizeRoles("student"),requestMentorRole)
router.route("/").get(verifyJWT , authorizeRoles("admin"),getRoleRequests)
router.route("/:requestId/approve").patch(verifyJWT,authorizeRoles("admin"),approveMentorRequest)
router.route("/:requestId/reject").patch(verifyJWT, authorizeRoles("admin"),rejectMentorRequest)

export default router;
