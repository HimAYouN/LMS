import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";


const getCurrentUser = asyncHandler(async(req,res) =>{
    return res
    .status(200)
    .json(new ApiResponse(200, req.user ,"Current User Fetched Successfully"))
    
});


const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // At least one field must be provided
  if (!name && !email && !phone) {
    throw new ApiError(400, "At least one field is required");
  }

  const updateData = {};

  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;

  if (email) {
    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user._id },
    });

    if (emailExists) {
      throw new ApiError(409, "Email already in use");
    }

    updateData.email = email;
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, user, "Account details updated successfully")
  );
});


const changeCurrentUserPassword = asyncHandler(async (req, res) => {
    
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old password and new password are required");
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    const isSamePassword = await user.isPasswordCorrect(newPassword);
    if (isSamePassword) {
        throw new ApiError(400, "New password cannot be the same as old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});




export {getCurrentUser , updateAccountDetails , changeCurrentUserPassword}