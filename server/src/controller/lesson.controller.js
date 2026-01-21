import { Lesson } from "../models/lesson.model.js";
import { Section } from "../models/section.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createLesson = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;
  const { title, content, order, isPreview } = req.body;

  if (!title || !content || order === undefined) {
    throw new ApiError(400, "Missing required fields");
  }

  const section = await Section.findById(sectionId);
  if (!section) {
    throw new ApiError(404, "Section not found");
  }

  const lesson = await Lesson.create({
    sectionId,
    title,
    content,
    order,
    isPreview,
  });

  return res.status(201).json(
    new ApiResponse(201, lesson, "Lesson created")
  );
});

export {createLesson}