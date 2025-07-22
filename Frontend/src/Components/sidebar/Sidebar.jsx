import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaThumbsUp, FaHistory, FaVideo, FaFolder, FaUsers, FaTwitter } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function Sidebar() {
  
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.userData)
  // console.log("User ",user)
  const id = user?.data?.data?._id || ""
  
  const userName = user?.data?.data?.userName || "me"

  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Liked Videos', icon: <FaThumbsUp />, path: '/likedVideos' },
    { name: 'Tweets', icon: <FaTwitter/>, path: `/user/${id}` },
    { name: 'My Content', icon: <FaVideo />, path: `/dashboard/${userName}` },
    { name: 'Collections', icon: <FaFolder />, path: '/uploadVideo' },
    { name: 'Playlist', icon: <FaUsers />, path: `/playlist/${id}` },
  ]

  return (
    <div className="bg-black text-white min-h-screen p-4 w-60">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer
                        hover:bg-purple-700 transition-colors border border-gray-700
                        ${item.name === 'Home' ? 'bg-purple-600' : ''}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
