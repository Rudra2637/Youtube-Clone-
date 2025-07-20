import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function VideoPreview() {
  const location = useLocation()
  const { title, description, thumbnail, videoUrl } = location.state || {}
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-500 mb-6">🎥 Video Uploaded Preview</h1>

      <div className="w-full max-w-3xl bg-zinc-900 border border-gray-700 rounded-lg p-6 shadow-md">
        
        {/* Video or Thumbnail */}
        {videoUrl && (
          showVideo ? (
            <video controls autoPlay className="w-full rounded border border-gray-700 mb-4">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div 
              onClick={() => setShowVideo(true)}
              className="relative cursor-pointer group"
            >
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                className="w-full rounded border border-gray-700 mb-4 group-hover:opacity-80 transition"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-4.596-2.65A1 1 0 009 9.35v5.3a1 1 0 001.156.982l4.596-2.65a1 1 0 000-1.764z" />
                  </svg>
                </div>
              </div>
            </div>
          )
        )}

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

export default VideoPreview
