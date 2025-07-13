import { asyncHandler } from "../utils/async_Handler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

// let oldImagePublicId ;
// let oldCoverPublicId;


const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
}


const registerUser = asyncHandler( async (req,res) => {
    // res.status(200).json({
    //     message:"Ok"
    // })
    const {fullName, userName, email, password} = req.body
    // console.log("req.body", req.body)
    // if(fullName === ""){
    //     throw new ApiError(400,"FullName required")      //Can do this way also 
    // }
    //Here is one new method to do the same 

    if(
        [fullName,userName,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }
    //Now we need to check if the user already exists or not 
    //Db me check krna hoga 
    const userExisted = await User.findOne({
        $or:[{ userName },{ email }]
    })
    if(userExisted){
        throw new ApiError(409,"User already exists")
    }
    // console.log("req.files", req.files)
    const avatarPath = req.files?.avatar?.[0]?.path
    // const coverPath = req.files?.coverImage?.[0]?.path

    if(!avatarPath){
        throw new ApiError(400,"Avatar is required")
    }
    let coverPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverPath = req.files.coverImage[0].path
    }
    // else{
    //     await uploadOnCloudinary(avatarPath)
    //     coverPath && await uploadOnCloudinary(coverPath)
    // }
    // const avatar = await uploadOnCloudinary(avatarPath)
    // const coverImage = await uploadOnCloudinary(coverPath)
    // console.log("avatar ",avatar)
    // oldImagePublicId = avatar?.publicId
    // oldCoverPublicId = coverImage?.publicId
    // console.log("oldImagePublicId ",oldImagePublicId)
    const avatar = await uploadOnCloudinary(avatarPath)
    const coverImage = await uploadOnCloudinary(coverPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }
     
    // console.log("avatar ",avatar)

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        userName:userName.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    // return res.status(201).json({createdUser})       can send this also
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )

})

//Steps to register user
//get user details from frontend
//validation - not empty
//check if user already exists:username,email
//check for images,check for avatar
//upload them to cloudinary,avatar
//create user object -create entry in db
//remove password and refresh token field from responses
//check for user creation
//return res

//Login User

const loginUser = asyncHandler( async (req,res) => {
    //Take data from frontEnd
    //Find the user based on the data to see if the user exists
    //Validate the data from the database 
    //Generate access token on login successfully and refresh token 
    //Send cookie
    //Accordingly send the response 
 
    const {userName, email, password} = req.body

    if(!(userName || email))throw new ApiError(400,"UserName or Email is required");

    // if([email,password].some((field) => field?.trim()) === "")throw new ApiError(402,"Fill all the required fields")
    // console.log("oldImagePublicId ",oldImagePublicId)

    const user = await User.findOne({
        $or:[{userName},{email}]
    })
    if(!user)throw new ApiError(404,"User Not found");

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid)throw new ApiError(401,"Invalid Credentials");

    // const accessToken = await user.generateAccessToken()
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select(
        " -password  -refreshToken"
    )

    //Now setting up of cookies

    const options = {
        httpOnly:true,
        secure:true   
    }                               //These two options if set true denote that the cookie can't be changed in the frontend it can only 
    // console.log("req.body me kya hai idhar dekho ",req.body)                                //be managed or changed by the server
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                loggedInUser,refreshToken,accessToken
            },
            "User logged in successfully"
        )
    )


})

const logOut = asyncHandler(async (req,res) => {
    //Remove the tokens from the user also reset the cookie
    // console.log("req.user console.log ",req.user)
    // const user = await User.findById(req.user?._id)
    // console.log("another user ",user)
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1           //Removes the field from the document
            }
        },
        {
            new:true             //  Returns either:The original (old) document by default Or the new (updated) one, if you pass { new: true }
        } 
    )
    const options = {
        httpOnly:true,
        secure:true   
    } 

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(200,
        {},
        "user logged out successfully"
    )

    
})

const refreshAccessToken = asyncHandler(async(req,res) => {
    
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingToken)throw new ApiError(401,"Unauthorized req");

    try {
        const decodedToken =  jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
    
        if(!user)throw new ApiError(402,"Invalid Token");
    
        if(incomingToken !== user?.refreshToken)throw new ApiError(401,"Refresh Token expired or used");
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res.
        status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken,options},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message ||"Invalid refresh Token")
    }
    // if(accessToken || refreshToken)console.log("Token Generated successfully");
    // else console.log("Error")

    
    
})

const changeCurrentPassword = asyncHandler(async(req,res) => {
    // const {userName,newPassword , confirmPassword} = req.body
    // if([newPassword,confirmPassword].some((fields) => fields?.trim() === ""))throw new ApiError(401,"All fields required");

    // const user = User.findOne({userName})
    // if(!user)throw new ApiError(401,"Invalid user");
    
    const {oldPassword,newPassword} = req.body

    const user = await User.findById(req.user?._id)
    if(!user)throw new ApiError(401,"Invalid User")
    const check = user.isPasswordCorrect(oldPassword)

    if(!check)throw new ApiError(402,"Invalid password");

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res.status(200)
    .json(new ApiResponse(200,{},"Password changed Successfully"))
})

const getCurrentUser = asyncHandler(async (req,res) => {
    return res.status(200)
    .json(new ApiResponse(200,req.user,"Userfetched Successfully")) 
})

const updateAccountDetails = asyncHandler(async(req,res) => {
    const {fullName,email} = req.body

    if(!(fullName || email))throw new ApiError(400,"All fields required");
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName,
                email
            }
        },
        {new:true}
    ).select("-password")

    return res.status(200)
    .json(new ApiResponse(
        200,
        user,
        "Account details updated successfully"
    ))

})

const updateUserAvatar = asyncHandler(async(req,res) => {
    const avatarPath = req.file?.path
    if(!avatarPath)throw new ApiError(400,"Avatar is required");

    //TODO Delete the image from cloudinary old one
    // console.log("oldImagePublicId ",oldImagePublicId)
    // const deletion = await deleteImage(oldImagePublicId)
    // if(!deletion)throw new ApiError(400,"Error while deleting old avatar image");

    const avatar = await uploadOnCloudinary(avatarPath)
    if(!avatar.url)throw new ApiError(400,"Error while uploading avatar");

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                avatar:avatar.url
            }
        },
        {new:true}
    ).select("-password")

     return res.status(200)
    .json(new ApiResponse(200,user,"Avatar Image Updated Successfully"))
})

const updateUserCover = asyncHandler(async(req,res) => {
    const coverPath = req.file?.path

    if(!coverPath)throw new ApiError(400,"Cover Path requried");

    // const deletion = await deleteImage(oldCoverPublicId)
    // if(!deletion)throw new ApiError(400,"Error while deleting old cover image");

    const coverImage = await uploadOnCloudinary(coverPath)

    if(!cover.url)throw new ApiError(400,"Error in uploading on cloudinary coverImage");
    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                coverImage:coverImage.url
            }

        },
        {new:true}
    ).select("-password")

    return res.status(200)
    .json(new ApiResponse(200,user,"cover Image Updated Successfully"))

})

const getUserChannelProfile = asyncHandler(async(req,res) => {
    const {userName} = req.params
    if(!userName?.trim())throw new ApiError(400,"UserName not found");

    const channel = await User.aggregate([
        {
            $match:{
                userName:userName?.toLowerCase()
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedTo"
            }
        },
        {
            $addFields:{
                subscriberCount:{
                    $size:"$subscribers"         //   $size:"$subscribers" try this if error 
                },
                channelSubscribedToCount:{
                    $size:"$subscribedTo"
                },
                isSubscribed:{
                    $cond:{
                        if:{$in: [req.user?._id,"$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project:{
                fullName:1,
                userName:1,
                subscriberCount:1,
                channelSubscribedToCount:1,
                isSubscribed:1,
                avatar:1,
                coverImage:1,
                email:1
            }
        }
    ])

    if(!channel?.length)throw new ApiError(404,"Channel does not exists");

    return res.status(200)
    .json(new ApiResponse(200,channel[0],"User channel fetched successfully"))

})

const getWatchHistory = asyncHandler(async(req,res) => {
    const user = await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"watchHistory",
                foreignField:"_id",
                as:"watchHistory",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",
                            pipeline:[
                                {
                                    $project:{
                                        fullName:1,
                                        userName:1,
                                        avatar:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first:"$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200)
    .json(new ApiResponse(200,user[0].watchHistory,"Watch History fetched Successfully"))
})

export {
    registerUser,
    loginUser,
    logOut,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCover,
    getUserChannelProfile,
    getWatchHistory
}