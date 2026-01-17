import { RoleRequest } from "../models/roleRequest.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { MentorProfile } from "../models/mentorProfile.model.js";



const requestMentorRole = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized access");
  }

  if (user.role !== "student") {
    throw new ApiError(
      403,
      "Only students can request mentor access"
    );
  }

  const existingRequest = await RoleRequest.findOne({
    userId: user._id,
    status: "pending",
  });

  if (existingRequest) {
    throw new ApiError(
      409,
      "You already have a pending mentor request"
    );
  }

  const roleRequest = await RoleRequest.create({
    userId: user._id,
    requestedRole: "mentor",
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        requestId: roleRequest._id,
        status: roleRequest.status,
        requestedRole: roleRequest.requestedRole,
        createdAt: roleRequest.createdAt,
      },
      "Mentor request submitted successfully"
    )
  );
});


const getRoleRequests = asyncHandler(async (req, res) => {
  const { status = "pending" } = req.query;

  const allowedStatuses = ["pending", "approved", "rejected"];
  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status filter");
  }

  const requests = await RoleRequest.find({ status })
    .populate("userId", "name email role")
    .populate("reviewedBy", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        total: requests.length,
        status,
        requests,
      },
      "Role requests fetched successfully"
    )
  );
});

const approveMentorRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new ApiError(400, "Invalid request ID");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const request = await RoleRequest.findById(requestId).session(session);
    if (!request) {
      throw new ApiError(404, "Role request not found");
    }

    if (request.status !== "pending") {
      throw new ApiError(400, "This request has already been processed");
    }

    const user = await User.findById(request.userId).session(session);
    if (!user) {
      throw new ApiError(404, "User no longer exists");
    }

    if (user.role !== "student") {
      throw new ApiError(400, "User is not eligible for mentor role");
    }

    const existingProfile = await MentorProfile.findOne({
      userId: user._id,
    }).session(session);

    if (existingProfile) {
      throw new ApiError(409, "Mentor profile already exists");
    }

    user.role = "mentor";
    await user.save({ session });

    // Create mentor profile
    await MentorProfile.create(
      [
        {
          userId: user._id,
          expertise: ["General"], 
          experience: 0,          // mentor can update later
        },
      ],
      { session }
    );

    request.status = "approved";
    request.reviewedBy = req.user._id;
    request.reviewedAt = new Date();
    await request.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          requestId: request._id,
          userId: user._id,
          newRole: "mentor",
        },
        "Mentor request approved and profile created successfully"
      )
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});


const rejectMentorRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { reason } = req.body;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new ApiError(400, "Invalid request ID");
  }

  const request = await RoleRequest.findById(requestId);
  if (!request) {
    throw new ApiError(404, "Role request not found");
  }

  if (request.status !== "pending") {
    throw new ApiError(400, "This request has already been processed");
  }

  request.status = "rejected";
  request.reviewedBy = req.user._id;
  request.reviewedAt = new Date();
  request.rejectionReason = reason || null;

  await request.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        requestId: request._id,
        status: request.status,
      },
      "Mentor request rejected successfully"
    )
  );
});




export{requestMentorRole , getRoleRequests, approveMentorRequest , rejectMentorRequest}