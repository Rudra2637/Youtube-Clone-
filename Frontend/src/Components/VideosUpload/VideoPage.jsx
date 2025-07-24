"use client"

import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import videoService from "../../functionalities/video"
import commentService from "../../functionalities/comment"

export default function VideoPage() {
  const location = useLocation()
  const { id } = useParams()
  const [videoData, setVideoData] = useState(location.state?.video || null)
  const [playVideo, setPlayVideo] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await videoService.getVideoById(id)
        const data = response.data
        setVideoData(data)
        setLiked(data.isLiked || false)
        console.log("VideoData", data)
      } catch (error) {
        console.error("Error in fetching video", error)
      }
    }

    const fetchComments = async () => {
      try {
        const response = await commentService.getComments(id)
        setComments(response.data)
      } catch (error) {
        console.error("Error in fetching comments", error)
      }
    }

    fetchVideo()
    fetchComments()
  }, [id])

  const addComment = async () => {
    try {
      const response = await commentService.addComment(id, newComment)
      setNewComment("")
      setComments((prev) => [response, ...prev])
    } catch (error) {
      console.error("Error in adding comment", error)
    }
  }

  const handleLike = async () => {
    try {
      if (!liked) {
        setLiked(true)
        await videoService.likeVideo(id)
      } else {
        setLiked(false)
        await videoService.likeVideo(id)
      }
    } catch (error) {
      console.error("Error toggling like", error)
    }
  }

  if (!videoData) {
    return (
      <div className="text-white bg-gradient-to-br from-gray-900 via-black to-red-900 h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-500/20 border border-red-500/50 rounded-3xl backdrop-blur-xl">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-2xl text-red-400 font-semibold">Video data not found</p>
          <p className="text-gray-400 mt-2">Please go back and try again</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 min-h-screen text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Column - Video Player and Info */}
        <div className="flex-1 space-y-6">
          {/* Video Player Section */}
          <div className="w-full">
            {!playVideo ? (
              <div
                className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-2xl"
                onClick={() => setPlayVideo(true)}
              >
                <img
                  src={videoData.thumbnail || "/default-thumbnail.jpg"}
                  alt="Video Thumbnail"
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Pulsing rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 border-4 border-white/20 rounded-full animate-ping"></div>
                  <div className="absolute w-32 h-32 border-4 border-white/10 rounded-full animate-ping delay-1000"></div>
                </div>
              </div>
            ) : (
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                <video className="w-full aspect-video object-cover" controls autoPlay>
                  <source src={videoData.videoFile || ""} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 shadow-xl">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {videoData.title}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-400 text-sm flex items-center space-x-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {videoData.views} views
                </span>
                <span>•</span>
                <span>{videoData.createdAt}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                    liked
                      ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30"
                      : "bg-gray-800 hover:bg-gray-700 border border-gray-600"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${liked ? "scale-110" : "group-hover:scale-110"}`}
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="font-semibold">{liked ? "Liked" : "Like"}</span>
                </button>

                <button className="group relative flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-600 transition-all duration-300 hover:scale-105">
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  <span className="font-semibold">Share</span>
                </button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl border border-gray-600/30 mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={videoData.owner?.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
                />
                <div>
                  <div className="font-bold text-lg">{videoData.owner?.userName || "Unknown"}</div>
                  <div className="text-sm text-gray-400">{videoData.owner?.subscribers || 0} Subscribers</div>
                </div>
              </div>
              <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
                <span className="relative">Subscribe</span>
              </button>
            </div>

            {/* Description */}
            <div className="p-4 bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-600/30">
              <h3 className="font-semibold text-gray-300 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">{videoData.description || "No description provided."}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Comments Section */}
        <div className="w-96 flex-shrink-0">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 shadow-xl sticky top-6 h-fit max-h-[calc(100vh-3rem)]">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            <div className="mb-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  💬
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-gray-800/50 border-2 border-gray-600/50 px-3 py-2 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-gray-800 transition-all duration-300 resize-none placeholder-gray-400 text-sm"
                    rows={2}
                  />
                  <button
                    className="group relative mt-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm"
                    onClick={addComment}
                  >
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Comment
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3 overflow-y-auto custom-scrollbar" style={{ maxHeight: "calc(100vh - 20rem)" }}>
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2">💭</div>
                  <p className="text-gray-400 text-sm">No comments yet</p>
                  <p className="text-gray-500 text-xs">Be the first to share your thoughts!</p>
                </div>
              ) : (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm p-3 rounded-xl border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <div className="flex gap-3">
                      <img
                        src={comment.avatar || "/default-avatar.png"}
                        alt="avatar"
                        className="w-7 h-7 rounded-full object-cover border border-gray-600 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-purple-300">{comment.userName || "Anonymous"}</div>
                        <div className="text-gray-300 text-xs mt-1 leading-relaxed break-words">{comment.content}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  )
}
