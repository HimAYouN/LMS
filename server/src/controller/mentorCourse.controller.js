import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { Section } from "../models/section.model.js";
import { Lesson } from "../models/lesson.model.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, level } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const course = await Course.create({
    title,
    description,
    category,
    level,
    mentorId: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(201, course, "Course created successfully (draft)")
  );
});


const getMyCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    mentorId: req.user._id,
  }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, courses, "Your courses fetched successfully")
  );
});


const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Ownership check
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this course");
  }

  const allowedUpdates = ["title", "description", "category", "level", "thumbnail"];
  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      course[field] = req.body[field];
    }
  });

  await course.save();

  return res.status(200).json(
    new ApiResponse(200, course, "Course updated successfully")
  );
});

const changeCourseStatus = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  if (!["draft", "published", "archived"].includes(status)) {
    throw new ApiError(400, "Invalid course status");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to modify this course");
  }

  course.status = status;
  await course.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      { courseId: course._id, status: course.status },
      "Course status updated successfully"
    )
  );
});

const getMentorCourseDetails = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  const course = await Course.findById(courseId).populate(
    "mentorId",
    "name"
  );

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Ownership check
  if (course.mentorId._id.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to view this course");
  }

  // Fetch sections
  const sections = await Section.find({ courseId })
    .sort({ order: 1 })
    .lean();

  // Fetch lessons for each section (NO FILTERING)
  for (const section of sections) {
    const lessons = await Lesson.find({
      sectionId: section._id,
    })
      .sort({ order: 1 })
      .lean();

    section.lessons = lessons;
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        course,
        sections,
      },
      "Mentor course details fetched successfully"
    )
  );
});



export {createCourse , getMyCourses, updateCourse, changeCourseStatus , getMentorCourseDetails}