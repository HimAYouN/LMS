import { Router } from "express";
import {registerUser,loginUser, refreshAccessToken, logoutUser} from "../controller/auth.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { changeCurrentUserPassword, getCurrentUser, updateAccountDetails } from "../controller/user.controller.js";


const router = Router();

//Auth Routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


//User Routes
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account-details").patch(verifyJWT,updateAccountDetails)
router.route("/change-password").patch(verifyJWT,changeCurrentUserPassword)

export default router;