"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"

function VideoPreview() {
  const location = useLocation()
  const { title, description, thumbnail, videoUrl } = location.state || {}
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 text-white flex flex-col items-center py-10 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 animate-pulse">
            🎬 Your Masterpiece is Ready!
          </h1>
          <p className="text-xl text-gray-300">Preview your uploaded content before sharing with the world</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
          {/* Video or Thumbnail */}
          {videoUrl &&
            (showVideo ? (
              <div className="relative group mb-6">
                <video controls autoPlay className="w-full rounded-2xl border-2 border-gray-700 shadow-2xl">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            ) : (
              <div
                onClick={() => setShowVideo(true)}
                className="relative cursor-pointer group mb-6 overflow-hidden rounded-2xl"
              >
                <img
                  src={thumbnail || "/placeholder.svg"}
                  alt="Video Thumbnail"
                  className="w-full rounded-2xl border-2 border-gray-700 transition-transform duration-500 group-hover:scale-105 shadow-2xl"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-green-500/80 to-blue-500/80 backdrop-blur-sm rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
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

                {/* Pulsing ring effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 border-4 border-white/30 rounded-full animate-ping"></div>
                </div>
              </div>
            ))}

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-3">
                {title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-600/50">
              <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>

            {/* Success indicators */}
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-green-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Upload Complete</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold">Ready to Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPreview
