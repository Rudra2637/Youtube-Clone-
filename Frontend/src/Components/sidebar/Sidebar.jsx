import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaThumbsUp, FaHistory, FaVideo, FaFolder, FaUsers } from 'react-icons/fa'

function Sidebar() {
  
  const navigate = useNavigate()

  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Liked Videos', icon: <FaThumbsUp />, path: '/likedVideos' },
    { name: 'History', icon: <FaHistory />, path: '/history' },
    { name: 'My Content', icon: <FaVideo />, path: '/user/:userId' },
    { name: 'Collections', icon: <FaFolder />, path: '/collections' },
    { name: 'Subscriptions', icon: <FaUsers />, path: '/subscriptions' },
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
