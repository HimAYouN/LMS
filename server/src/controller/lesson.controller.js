import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
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

const updateLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const { title, content, isPreview } = req.body;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    throw new ApiError(400, "Invalid lesson ID");
  }

  // At least one field required
  if (
    title === undefined &&
    content === undefined &&
    isPreview === undefined
  ) {
    throw new ApiError(400, "No fields provided for update");
  }

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }

  const section = await Section.findById(lesson.sectionId);
  if (!section) {
    throw new ApiError(404, "Section not found");
  }

  const course = await Course.findById(section.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Ownership check
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this lesson");
  }

  // Apply updates
  if (title !== undefined) lesson.title = title;
  if (content !== undefined) lesson.content = content;
  if (isPreview !== undefined) lesson.isPreview = isPreview;

  await lesson.save();

  return res.status(200).json(
    new ApiResponse(200, lesson, "Lesson updated successfully")
  );
});

const deleteLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    throw new ApiError(400, "Invalid lesson ID");
  }

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }

  const section = await Section.findById(lesson.sectionId);
  if (!section) {
    throw new ApiError(404, "Section not found");
  }

  const course = await Course.findById(section.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Ownership check
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this lesson");
  }

  await lesson.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      { lessonId },
      "Lesson deleted successfully"
    )
  );
});

const reorderLessons = asyncHandler(async (req, res) => {
  const { sectionId, lessons } = req.body;

  if (!mongoose.Types.ObjectId.isValid(sectionId)) {
    throw new ApiError(400, "Invalid section ID");
  }

  if (!Array.isArray(lessons) || lessons.length === 0) {
    throw new ApiError(400, "Lessons array is required");
  }

  for (const item of lessons) {
    if (
      !item.lessonId ||
      !mongoose.Types.ObjectId.isValid(String(item.lessonId)) ||
      typeof item.order !== "number"
    ) {
      throw new ApiError(400, "Invalid lesson reorder payload");
    }
  }

  const section = await Section.findById(sectionId);
  if (!section) {
    throw new ApiError(404, "Section not found");
  }

  const course = await Course.findById(section.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // 🔐 Ownership check
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to reorder lessons");
  }

  const lessonDocs = await Lesson.find({
    _id: { $in: lessons.map((l) => l.lessonId) },
  });

  if (lessonDocs.length !== lessons.length) {
    throw new ApiError(404, "One or more lessons not found");
  }

  // Ensure all lessons belong to this section
  const sameSection = lessonDocs.every(
    (l) => l.sectionId.toString() === sectionId
  );

  if (!sameSection) {
    throw new ApiError(400, "Lessons must belong to the same section");
  }

  const bulkOps = lessons.map((l) => ({
    updateOne: {
      filter: { _id: l.lessonId },
      update: { $set: { order: l.order } },
    },
  }));

  await Lesson.bulkWrite(bulkOps);

  return res.status(200).json(
    new ApiResponse(200, {}, "Lessons reordered successfully")
  );
});


export {createLesson , updateLesson , deleteLesson , reorderLessons}