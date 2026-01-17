import { ApiError } from "../utils/apiError.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!req.user || !req.user.role) {
      throw new ApiError(401, "Unauthorized access");
    }

    // Role check
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }

    next();
  };
};
