import { Section } from "../models/section.model.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Lesson } from "../models/lesson.model.js";

import mongoose from "mongoose";  

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


const updateSection = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(sectionId)) {
    throw new ApiError(400, "Invalid section ID");
  }

  if (!title) {
    throw new ApiError(400, "Section title is required");
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
    throw new ApiError(403, "You are not allowed to update this section");
  }

  section.title = title;
  await section.save();

  return res.status(200).json(
    new ApiResponse(200, section, "Section updated successfully")
  );
});

const deleteSection = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sectionId)) {
    throw new ApiError(400, "Invalid section ID");
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
    throw new ApiError(403, "You are not allowed to delete this section");
  }

  // 🧨 Cascade delete lessons
  await Lesson.deleteMany({ sectionId });

  // ❌ Delete section
  await section.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      { sectionId },
      "Section and its lessons deleted successfully"
    )
  );
});

const reorderSections = asyncHandler(async (req, res) => {
  const { sections } = req.body;

  if (!Array.isArray(sections) || sections.length === 0) {
    throw new ApiError(400, "Sections array is required");
  }

  for (const item of sections) {
    if (
      !item.sectionId ||
      !mongoose.Types.ObjectId.isValid(String(item.sectionId)) ||
      typeof item.order !== "number"
    ) {
      throw new ApiError(400, "Invalid section reorder payload");
    }
  }

  const sectionDocs = await Section.find({
    _id: { $in: sections.map((s) => s.sectionId) },
  });

  if (sectionDocs.length !== sections.length) {
    throw new ApiError(404, "One or more sections not found");
  }

  const courseId = sectionDocs[0].courseId.toString();

  const sameCourse = sectionDocs.every(
    (s) => s.courseId.toString() === courseId
  );

  if (!sameCourse) {
    throw new ApiError(400, "Sections must belong to the same course");
  }

  const course = await Course.findById(courseId);
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to reorder sections");
  }

  const bulkOps = sections.map((s) => ({
    updateOne: {
      filter: { _id: s.sectionId },
      update: { $set: { order: s.order } },
    },
  }));

  await Section.bulkWrite(bulkOps);

  return res.status(200).json(
    new ApiResponse(200, {}, "Sections reordered successfully")
  );
});







export {createSection , updateSection , deleteSection , reorderSections}