import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import {ApiError} from "../utils/apiError.js";



const getAllUsers = asyncHandler(async (req, res) => {
  const {
    role,
    status,
    search,
    limit = 50, 
  } = req.query;

  // Hard upper limit to protect server
  const MAX_LIMIT = 100;
  const safeLimit = Math.min(Number(limit), MAX_LIMIT);

  const query = {};

  // Role filter
  if (role) {
    query.role = role;
  }

  // Status filter
  if (status) {
    query.status = status;
  }

  // Search system
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Fetch users with limit
  const users = await User.find(query)
    .select("-password -refreshToken")
    .sort({ createdAt: -1 })
    .limit(safeLimit);

  // Total count
  const totalUsers = await User.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalUsers,
        returnedUsers: users.length,
        limit: safeLimit,
        users,
      },
      "Users fetched successfully"
    )
  );
});


const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(userId).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "User fetched successfully"
    )
  );
});



export {getAllUsers, getUserById}
