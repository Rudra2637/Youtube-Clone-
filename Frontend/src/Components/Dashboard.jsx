import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authService from '../functionalities/user'
import videoService from '../functionalities/video'

function Dashboard() {
  const { userName } = useParams()
  const [channel, setChannel] = useState(null)
  const [stats, setStats] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true)

        // Fetch channel profile
        const profileData = await authService.getUserChannelProfile(userName)
        setChannel(profileData.data)

        // Fetch stats and videos (you must implement these methods in `videoService`)
        const statsData = await videoService.getChannelStats()
        const videoList = await videoService.getChannelVideos()

        setStats(statsData.data)
        setVideos(videoList.data)

      } catch (err) {
        setError(err.response?.data?.message || "Error loading dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchChannelData()
  }, [userName])

  if (loading) return <div className="text-center mt-10 text-purple-500">Loading...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-black text-white rounded-lg shadow p-6">
      {/* Cover image */}
      <div className="relative h-48 w-full rounded overflow-hidden mb-6">
        <img 
          src={channel.data.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile info */}
      <div className="flex items-center gap-6 mb-6">
        <img 
          src={channel.data.avatar}
          alt={channel.data.userName}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-purple-400">{channel.data.fullName}</h2>
          <p className="text-gray-400">@{channel.data.userName}</p>
          <p className="text-gray-500 text-sm">{channel.data.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
        <div>
          <p className="text-xl font-semibold">{stats?.totalSubscribers || 0}</p>
          <p className="text-gray-400 text-sm">Subscribers</p>
        </div>
        <div>
          <p className="text-xl font-semibold">{stats?.totalVideos || 0}</p>
          <p className="text-gray-400 text-sm">Videos</p>
        </div>
        <div>
          <p className="text-xl font-semibold">{stats?.totalViews || 0}</p>
          <p className="text-gray-400 text-sm">Views</p>
        </div>
        <div>
          <p className="text-xl font-semibold">{stats?.totalLikes || 0}</p>
          <p className="text-gray-400 text-sm">Likes</p>
        </div>
      </div>

      {/* Subscription status */}
      {typeof channel.isSubscribed === "boolean" && (
        <div className="mb-8">
          {channel.data.isSubscribed ? (
            <button className="px-4 py-2 rounded border border-gray-600 bg-purple-600">
              Subscribed
            </button>
          ) : (
            <button className="px-4 py-2 rounded border border-purple-500 hover:bg-purple-600">
              Subscribe
            </button>
          )}
        </div>
      )}

      {/* Uploaded videos */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Uploaded Videos</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-zinc-800 rounded p-4 border border-gray-700">
              <img src={video.thumbnail} alt={video.title} className="rounded w-full mb-2" />
              <h4 className="text-lg font-semibold">{video.title}</h4>
              <p className="text-sm text-gray-400">{video.description}</p>
              <p className="text-sm text-gray-500 mt-1">Views: {video.views} | Duration: {video.duration}s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
