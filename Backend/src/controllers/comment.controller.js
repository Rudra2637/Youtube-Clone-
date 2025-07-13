import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async_Handler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const comments = await Comment.aggregate([
        { $match: { video: new mongoose.Types.ObjectId(videoId) } },

        { $lookup: {
            from: "videos",
            localField: "video",
            foreignField: "_id",
            as: "videoDetail"
        }},
        { $unwind: "$videoDetail" },

        { $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerDetails"
        }},
        { $unwind: "$ownerDetails" },

        { $project: {
            content: 1,
            createdAt: 1,
            videoTitle: "$videoDetail.title",
            videoThumbnail: "$videoDetail.thumbnail",
            userName: "$ownerDetails.userName",
            avatar: "$ownerDetails.avatar"
        }},

        { $skip: (parseInt(page) - 1) * parseInt(limit) },
        { $limit: parseInt(limit) }
    ]);

    return res.status(200).json(
        new ApiResponse(200, comments, "Comments fetched successfully")
    );
});

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body
    const userId = req.user?._id

    const comment = await Comment.create({
        content,
        video :videoId,
        owner:userId
    })

    if(!comment)throw new ApiError(402,"Error in creating comment");

    return res.status(200)
    .json(
        new ApiResponse(200,comment,"Comment added successfully")
    )


})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    const {content} = req.body
    
    const comment = await Comment.findByIdAndUpdate(commentId,
        {
            $set:{
                content
            }
        },
        {new:true}
    )

    if(!comment)throw new ApiError(402,"Error in updating comment");

    return res.status(200)
    .json(
        new ApiResponse(200,comment,"Comment updated successfully")
    )


})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params
    const comment = await Comment.findByIdAndDelete(commentId)

    if(!comment)throw new ApiError(402,"Error in deleting comment");

    return res.status(200)
    .json(
        new ApiResponse(200,comment,"Comment deleted successfully")
    )
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }