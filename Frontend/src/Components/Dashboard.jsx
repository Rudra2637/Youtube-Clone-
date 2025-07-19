import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authService from '../functionalities/user'

function Dashboard() {
  const { userName } = useParams()
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true)
        const data = await authService.getUserChannelProfile(userName)
        console.log("dashboard data ",data)
        setChannel(data.data)
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching channel")
      } finally {
        setLoading(false)
      }
    }
    fetchChannel()
  }, [userName])
  
  if (loading) return <div className="text-center mt-10 text-purple-500">Loading...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>
  
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-black text-white rounded-lg shadow p-6">
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
      <div className="flex gap-6 mb-6">
        <div>
          <span className="text-xl font-semibold">{channel.data.subscriberCount}</span>
          <p className="text-gray-500 text-sm">Subscribers</p>
        </div>
        <div>
          <span className="text-xl font-semibold">{channel.data.channelSubscribedToCount}</span>
          <p className="text-gray-500 text-sm">{channel.data.isSubscribed}</p>
        </div>
      </div>

      {/* Subscription status */}
      {typeof channel.data.isSubscribed === "boolean" && (
        <div>
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
    </div>
  )
}

export default Dashboard
