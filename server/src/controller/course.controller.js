import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Course} from "../models/course.model.js";


export const getPublishedCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    status: "published",
  })
    .select(
      "title description category level thumbnail price mentorId createdAt"
    )
    .populate("mentorId", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      courses,
      "Published courses fetched successfully"
    )
  );
});