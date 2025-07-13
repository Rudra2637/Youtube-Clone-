import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async_Handler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    // TODO: toggle subscription
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;


    if(!subscriberId) throw new ApiError(400, "Channel ID is required");

    const getList = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriberList"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "owner"
            }
        },
        { $unwind: "$owner" },
        {
            $project: {
                subscriber: 1,
                channel: 1,
                subscriberList: 1,
                userName: "$owner.userName"
            }
        }
    ]);
    if(getList.length === 0) {
        throw new ApiError(404, "No subscribers found for this channel.");
    }


    return res
        .status(200)
        .json(new ApiResponse(200, getList, "Subscribers fetched successfully"));
});


// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    const channelSubscribed = await Subscription.aggregate([
        {
            $match:{
                subscriber:new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"channel",
                foreignField:"_id",
                as:"subscribedList"
            }
        },
        {$unwind:"$subscribedList"},
        {
            $project:{
                userName:"$subscribedList.userName",
                avatar:"$subscribedList.avatar",
                channelId:"$subscribedList._id",
            }
        }
    ])
    if(channelSubscribed.length === 0)throw new ApiError(402,"No channels subscribed yet");

    return res
        .status(200)
        .json(new ApiResponse(200, channelSubscribed, "Subscribed channels fetched successfully"));
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}