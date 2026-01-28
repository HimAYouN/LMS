import mongoose from "mongoose";
import { Quiz } from "../models/quiz.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";
import { Enrollment } from "../models/enrollment.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getQuizForStudent = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    throw new ApiError(400, "Invalid quiz ID");
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  //  Ensure student is enrolled in the course
  const enrollment = await Enrollment.findOne({
    courseId: quiz.courseId,
    studentId: req.user._id,
    status: "active",
  });

  if (!enrollment) {
    throw new ApiError(403, "You are not enrolled in this course");
  }

  //  Remove correct answers
  const safeQuestions = quiz.questions.map((q, index) => ({
    questionIndex: index,
    questionText: q.questionText,
    options: q.options,
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        quizId: quiz._id,
        title: quiz.title,
        questions: safeQuestions,
      },
      "Quiz fetched successfully"
    )
  );
});

const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    throw new ApiError(400, "Invalid quiz ID");
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    throw new ApiError(400, "Answers are required");
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  //  Ensure student is enrolled
  const enrollment = await Enrollment.findOne({
    courseId: quiz.courseId,
    studentId: req.user._id,
    status: "active",
  });

  if (!enrollment) {
    throw new ApiError(403, "You are not enrolled in this course");
  }

  let score = 0;
  const evaluatedAnswers = [];

  answers.forEach(({ questionIndex, selectedOptionIndex }) => {
    const question = quiz.questions[questionIndex];

    if (!question) return;

    const isCorrect =
      question.correctOptionIndex === selectedOptionIndex;

    if (isCorrect) score++;

    evaluatedAnswers.push({
      questionIndex,
      selectedOptionIndex,
      isCorrect,
    });
  });

  const attempt = await QuizAttempt.create({
    quizId,
    courseId: quiz.courseId,
    studentId: req.user._id,
    answers: evaluatedAnswers,
    score,
    totalQuestions: quiz.questions.length,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        score,
        totalQuestions: quiz.questions.length,
      },
      "Quiz submitted successfully"
    )
  );
});


export {submitQuiz, getQuizForStudent}
