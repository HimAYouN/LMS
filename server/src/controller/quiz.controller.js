import mongoose from "mongoose";
import { Quiz } from "../models/quiz.model.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createQuiz = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, questions } = req.body;

  //  Validate courseId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  // Basic payload validation
  if (!title || !Array.isArray(questions)) {
    throw new ApiError(400, "Quiz title and questions are required");
  }

  // Question count rule
  if (questions.length === 0 || questions.length > 5) {
    throw new ApiError(400, "Quiz must have 1 to 5 questions");
  }

  // Validate each question
  questions.forEach((q, index) => {
    if (
      !q.questionText ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      typeof q.correctOptionIndex !== "number" ||
      q.correctOptionIndex < 0 ||
      q.correctOptionIndex > 3
    ) {
      throw new ApiError(
        400,
        `Invalid question format at index ${index}`
      );
    }
  });

  // Fetch course
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Ownership check
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to add quiz to this course");
  }

  // Create quiz
  const quiz = await Quiz.create({
    title,
    courseId,
    mentorId: req.user._id,
    questions,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      quiz,
      "Quiz created successfully"
    )
  );
});

const getCourseQuizzes = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  //  Ownership check
  if (course.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to view quizzes of this course");
  }

  const quizzes = await Quiz.find({ courseId })
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      quizzes,
      "Quizzes fetched successfully"
    )
  );
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    throw new ApiError(400, "Invalid quiz ID");
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  //  Ownership check
  if (quiz.mentorId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this quiz");
  }

  await quiz.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      { quizId },
      "Quiz deleted successfully"
    )
  );
});





export {createQuiz , getCourseQuizzes, deleteQuiz}