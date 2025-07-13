import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async_Handler.js"
import { User } from "../models/user.model.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    if([name,description].some((item) => item.trim() === ""))throw new ApiError(400,"All fields required");

    const owner = await User.findById(req.body._id).select(
        "-password  -refreshToken "
    )

    if(!owner)throw new ApiError(400,"Owner not found");
    
    const videos = []
    const playlist = await Playlist.create({
        name,
        description,
        videos,
        owner
    })
    if(!playlist)throw new ApiError(401,"Error in creating playlist");

    return res.status(200)
    .json(
        new ApiResponse(200,playlist,"playlist created successfully")
    )
    //TODO: create playlist
    //Data taken from the frontEnd
    //verify the data
    //Create an entry in the database 
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    
    const playlist = await Playlist.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"videos",
                foreignField:"_id",
                as:"videoArr",
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
                                        userName:1,
                                        avatar:1,
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
        },
       
    ])
     if (!playlists.length) {
        throw new ApiError(404, "No playlists found for this user");
    }

    return res.status(200)
    .json(
        new ApiResponse(200,playlist,"User playlist fetched")
    )
    
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID format");
    }

    const playlist = await Playlist.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videoArr",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        userName: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: { $first: "$owner" }
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "playlistOwner",
                pipeline: [
                    {
                        $project: {
                            userName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                playlistOwner: { $first: "$playlistOwner" }
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                videoArr: 1,
                playlistOwner: 1
            }
        }
    ]);

    if (!playlist.length) {
        throw new ApiError(404, "Playlist not found");
    }

    return res.status(200).json(
        new ApiResponse(200, playlist[0], "Playlist fetched successfully")
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    const playlist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $addToSet:{
                videos:videoId
            },
        },
        {new:true}
    )
    if(!playlist)throw new ApiError(200,"Problem in adding video to playlist");

    return res.status(200)
    .json(
        new ApiResponse(
            200,playlist,"Video added to playlist"
        )
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    const playlist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $pull:{                                //$pull is used to remove an item from an array
                videos:videoId
            }
        },
        {new:true}
    )

    if(!playlist)throw new ApiError(200,"Problem in adding video to playlist");

    return res.status(200)
    .json(
        new ApiResponse(
            200,playlist,"Video removed from playlist"
        )
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    const playlist = await Playlist.findByIdAndDelete(playlistId)
    if(!playlist)throw new ApiError(404,"Invalid request");

    return res.status(200)
    .json(
        new ApiResponse(200,[],"Playlist deleted successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    const playlist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $set:{
                name,
                description
            }
        },
        {new:true}
    )
    if(!playlist)throw new ApiError(404,"Invalid request");

    return res.status(200)
    .json(
        new ApiResponse(200,playlist,"Playlist Updated Successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}