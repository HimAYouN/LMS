import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  verifyJWT,
  authorizeRoles("mentor"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Mentor Dashboard",
      user: req.user,
    });
  }
);


router.route("/dashboard").get(verifyJWT,authorizeRoles("mentor"),(req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Mentor Dashboard",
      user: req.user,
    });
  })

export default router;
