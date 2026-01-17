import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken,refreshToken}


    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler ( async(req, res) => {
    
    if(!req.body || Object.keys(req.body).length === 0){
        throw new ApiError(400, "Fields are required to register")
    }

    const {name , email, password, phone} = req.body

    if(
        [name, email, password].some( (field) => field?.trim() === "")
    ){
        throw new ApiError(400 ,"All fields are required" )
    }

    const existedUser = await User.findOne({
        $or : [{name}, {email}]
    })

    if(existedUser){
        throw new ApiError(409 ,"User with name or email already exists ")
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,

    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering a user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser,"user registered successfully")
    )

})

const loginUser  = asyncHandler (async(req,res) => {
    const {email, password, loginAs } = req.body

    if(!email || !password) {
        throw new ApiError(400,"Email and password are required!");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404, "User does not exist");
    }

    const ispasswordValid = await user.isPasswordCorrect(password) 
    
    if(!ispasswordValid){
        throw new ApiError(401,"Invalid User Credentials")
    }

    if (loginAs && user.role !== loginAs) {
    throw new ApiError(
      403,
      `You are not allowed to login as ${loginAs}`
    );
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options ={
        httpOnly : true,
        secure : true,
    };



    return res
        .status(200)
        .cookie("accessToken", accessToken,options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user : loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User loggedIn Successfully"
            )
        );
});

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        {
            new :true
        }
    )


    const options = {
     httpOnly : true,
     secure: false,  
     sameSite: "lax"
   }

   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200 ,{},"user logged out"))
});

const refreshAccessToken = asyncHandler(async(req,res) =>{
    const incomingRefreshToken = req.cookies?.refreshToken ||req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized Access")
    }

    try{
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401, "Invalid refresh Token")
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"refresh token is expired or used")
        }

        const options = {
            httpOnly : true,
            secure : true
        }

        const {accessToken ,refreshToken} = await generateAccessAndRefreshTokens(user._id)

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken},
                "Access token refreshed successfully"
            )
        )
    } catch(error){
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
});


export { registerUser, loginUser , logoutUser, refreshAccessToken}