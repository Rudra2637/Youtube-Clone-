import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async_Handler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if(title.trim() === "" || description.trim() === "")throw new ApiError(402,"All fields required");
    
    const thumbnailPath = req.files?.thumbnail?.[0]?.path

    const videoFilePath = req.files?.videoFile?.[0]?.path

    const uploadThumbnail = await uploadOnCloudinary(thumbnailPath)
    const uploadVideo = await uploadOnCloudinary(videoFilePath)

    const duration  = uploadVideo?.duration || 0
    const videoFile = uploadVideo?.secure_url
    const thumbnail = uploadThumbnail?.secure_url

    const owner = req.user?._id

    const video = await Video.create({
        title,
        description,
        videoFile,
        thumbnail,
        owner,
        duration,
    })

    if(!video)throw new ApiError(402,"Error in publishing video");

    return res.status(201).json(
        new ApiResponse(201, video, "Video published successfully")
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    const video = await Video.findById(videoId)

    if(!video)throw new ApiError(402,"Invalid videoId");

    return res.status(200).json
    (new ApiResponse(200,video,"Video fetched"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    const  {title,description} = req.body
    const thumbnailPath = req.files?.thumbnail[0].path

    const thumbnail = await uploadOnCloudinary(thumbnailPath)

    if(!thumbnail)throw new ApiError(404,"Error in uploading thumbnail");

    const video = await Video.findByIdAndUpdate(videoId,
        {
            $set:{
                title,
                description,
                thumbnail:thumbnail.url
            }
        },
        {new:true}
    )

    if(!video)throw new ApiError(401,"Something went wrong");

    return res.status(200)
    .json(
        new ApiResponse(200,video,"Video updated Successfully")
    )

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    const video = await Video.findByIdAndDelete(videoId)
    return res.status(200)
    .json(
        new ApiResponse(200,video,"Video Removed successfully")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video = await Video.findById(videoId)
     if (!video) {
        throw new ApiError(404, "Video not found");
    }
    video.isPublished = !video.isPublished
    await video.save()
    
    return res.status(200).json(
        new ApiResponse(200, video, "Video publish status toggled successfully")
    );
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}