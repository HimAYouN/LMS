import { getAllUsers , getUserById } from "../controller/admin.controller.js";
import {Router} from "express";
import {verifyJWT} from "../middleware/auth.middleware.js";
import {authorizeRoles} from "../middleware/role.middleware.js";


const router = Router();

router.route("/all-users").get(verifyJWT, authorizeRoles("admin"), getAllUsers);
router.route("/users/:userId").get(verifyJWT, authorizeRoles("admin"), getUserById);





export default router;