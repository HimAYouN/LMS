import { Section } from "../models/section.model.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSection = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, order } = req.body;

  if (!title || order === undefined) {
    throw new ApiError(400, "Title and order are required");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // ownership check
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to modify this course");
  }

  const section = await Section.create({
    courseId,
    title,
    order,
  });

  return res.status(201).json(
    new ApiResponse(201, section, "Section created")
  );
});


export {createSection}