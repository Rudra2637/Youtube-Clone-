import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async_Handler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    const userId = req.user._id

    const existingLike = await Like.findOne({
        video:videoId,
        likedBy:userId
    }) 
    if(existingLike){
        await existingLike.deleteOne()
        return res.status(200).json(new ApiResponse(200,null,"Like removed successfully"))
    }
    else{
        const like = await Like.create({
            video:videoId,
            likedBy:userId
        })

        return res.status(200)
        .json(
            new ApiResponse(200,null,"Liked the video")
        )
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    //TODO: toggle like on comment
    const {commentId} = req.params
    const userId = req.user._id

    const existingLike = await Like.findOne({
        comment:commentId,
        likedBy:userId
    })
    
    if(existingLike){
        await existingLike.deleteOne()
        return res.status(200)
        .json(new ApiResponse(200,null,"Like removed successfully"))
    }
    else{
        const Like = await Like.create({
            comment:commentId,
            likedBy:userId
        })

        return res.status(200)
        .json(200,null,"Liked Comment")
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    //TODO: toggle like on tweet
    const {tweetId} = req.params
    const userId = req.user._id

    const existingLike = await Like.findOne({
        tweet:tweetId,
        likedBy:userId
    })

    if(existingLike){
        await existingLike.delete()
        return res.status(200)
        .json(
            new ApiResponse(200,null,"Like removed successfully")
        )
    }
    else{
        const Like = await Like.create({
            tweet:tweetId,
            likedBy:userId
        })

        return res.status(200)
        .json(200,null,"Liked tweet")
    }
    
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId = req.user._id
    const videos = await Like.aggregate([
        {
            $match:{
                likedBy:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"video",
                foreignField:"_id",
                as:"likedvideo",
            }
        },
        {$unwind:"$likedvideo"},
        {
            $lookup:{
                from:"users",
                localField:"likedvideo.owner",
                foreignField:"_id",
                as:"likedvideo.owner"
            }
        },
        {$unwind:"$likedvideo.owner"},
        {
            $project:{
                videoId:"$likedvideo._id",
                title:"$likedvideo.title",
                thumbnail:"$likedvideo.thumbnail",
                duration:"$likedvideo.duration",
                owner:{
                    userName:{
                        userName:"$likedvideo.owner.userName",
                        avatar:"$likedvideo.owner.avatar"
                    }
                }
            }
        }
        
    ])
    

    
    if (!videos.length) throw new ApiError(404, "No liked videos");

    return res.status(200)
    .json(
        new ApiResponse(200,videos,"Liked Videos")
    )
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}