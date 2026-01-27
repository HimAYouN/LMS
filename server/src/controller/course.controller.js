import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Course} from "../models/course.model.js";
import mongoose from "mongoose";
import { Section } from "../models/section.model.js";
import { Lesson } from "../models/lesson.model.js";
import { Enrollment } from "../models/enrollment.model.js";

const getPublishedCourses = asyncHandler(async (req, res) => {
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




const getCourseDetails = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  // Fetch course
  const course = await Course.findById(courseId).populate(
    "mentorId",
    "name"
  );
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const user = req.user || null;

  const isMentorOwner =
    user &&
    user.role === "mentor" &&
    course.mentorId._id.toString() === user._id.toString();

  //  Course visibility check
  if (course.status !== "published" && !isMentorOwner) {
    throw new ApiError(403, "Course is not available");
  }

  //  Check enrollment (only for students)
  let isEnrolled = false;

  if (user && user.role === "student") {
    const enrollment = await Enrollment.findOne({
      studentId: user._id,
      courseId,
      status: "active",
    });

    isEnrolled = !!enrollment;
  }

  //  Fetch sections
  const sections = await Section.find({ courseId })
    .sort({ order: 1 })
    .lean();

  //  Fetch lessons for each section with visibility rules
  for (const section of sections) {
    let lessonQuery = { sectionId: section._id };

    if (!isEnrolled && !isMentorOwner) {
      lessonQuery.isPreview = true;
    }

    const lessons = await Lesson.find(lessonQuery)
      .sort({ order: 1 })
      .select("title content isPreview order")
      .lean();

    // Hide content if not allowed
    if (!isEnrolled && !isMentorOwner) {
      lessons.forEach((lesson) => {
        if (!lesson.isPreview) {
          lesson.content = null;
        }
      });
    }

    section.lessons = lessons;
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        course,
        sections,
        isEnrolled,
      },
      "Course details fetched successfully"
    )
  );
});


export {getPublishedCourses ,getCourseDetails }