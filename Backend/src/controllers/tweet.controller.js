import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async_Handler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    //Get the tweet from the form
    //Check the necessary validations 
    //Put the tweet in the database 
    const {content} = req.body
    // console.log(req.body)
    // console.log("tweet ",content)
    if(content.trim() === "")throw new ApiError(400,"Fill the required fields");
    
    
    const owner = await User.findById(req.user._id).select(
        "-password -refreshToken"
    )
    if(!owner)throw new ApiError(401,"Invalid User");
    // console.log("owner ",owner)
    const create = await Tweet.create({
        content,
        owner
    }) 

    return res.status(200)
    .json(new ApiResponse(200,create,"Tweet created successfully"))

})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    //Get the userId from the url
    //Retrieve the user tweets by making call in the database 
    const {userId} = req.params
    if(!userId)throw new ApiError(400,"Invalid User id");

    const user = await User.findById(req.user._id)     //Can do this and also there is one more way to do this

    const content = await Tweet.aggregate([
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner"
            }
        },
        {$unwind:"$owner"},
        {
            $project:{
                userName:1,
                avatar:1,
                coverImage:1,
                content:1,
                createdAt:1,
                updatedAt:1,
                userName:"$owner.userName",
                avatar:"$owner.avatar",
                coverImage:"$owner.coverImage",
            }
        }
    ])

    // const content = await Tweet.aggregate([
    //     {
    //         $match: {
    //             owner: new mongoose.Types.ObjectId(userId)
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "owner",
    //             foreignField: "_id",
    //             as: "owner"
    //         }
    //     },
    //     { $unwind: "$owner" },
    //     {
    //         $project: {
    //             content: 1,
    //             createdAt: 1,
    //             updatedAt: 1,
    //             userName: "$owner.userName",
    //             avatar: "$owner.avatar",
    //             coverImage: "$owner.coverImage"
    //         }
    //     }
    // ]);



    if(content.length === 0)throw new ApiError(401,"No tweet made by user");
    console.log("content ",content)
    return res.status(200)
    .json(new ApiResponse(200,content[0],"Tweets fetched successfully"))

})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params
    const {content} = req.body
    
    const tweet = await Tweet.findByIdAndUpdate(tweetId,
        {
            $set:{
                content
            }
        },
        {new:true}
    )
    if(!tweet)throw new ApiError(401,"Invalid Req");

    return res.status(200)
    .json(new ApiResponse(200,tweet,"Tweet updated Successfully"))
    
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const{tweetId} = req.params

    const tweet = await Tweet.findByIdAndDelete(tweetId)
    if(!tweet)throw new ApiError(401,"Invalid Req");

    return res.status(200)
    .json(new ApiResponse(200,tweet,"Tweet Deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}