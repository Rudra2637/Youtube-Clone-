import React, { useEffect, useState } from 'react'
import videoService from '../functionalities/video'

function LikedVideos() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await videoService.getLikedVideos()
        setVideos(response.data)
      } catch (error) {
        console.error("Error fetching liked videos:", error)
      }
    }
    fetchLikedVideos()
  }, [])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h2 className="text-3xl font-bold text-purple-500 mb-8">❤️ Liked Videos</h2>

      {videos.length === 0 ? (
        <p className="text-gray-400">You haven't liked any videos yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((item) => (
            <div
              key={item.videoId}
              className="bg-zinc-900 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-purple-500/20 transition"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                  {formatDuration(item.duration)}
                </span>
              </div>

              {/* Title */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-purple-400">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LikedVideos
