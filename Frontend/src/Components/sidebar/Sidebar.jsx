"use client"

import { useNavigate } from "react-router-dom"
import { FaHome, FaThumbsUp, FaVideo, FaFolder, FaUsers, FaTwitter } from "react-icons/fa"
import { useSelector } from "react-redux"

function Sidebar() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)
  const id = user?.data?.data?._id || ""
  const userName = user?.data?.data?.userName || "me"

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/", color: "from-blue-500 to-cyan-500", emoji: "🏠" },
    { name: "Liked Videos", icon: <FaThumbsUp />, path: "/likedVideos", color: "from-red-500 to-pink-500", emoji: "❤️" },
    { name: "Tweets", icon: <FaTwitter />, path: `/user/${id}`, color: "from-cyan-500 to-blue-500", emoji: "🐦" },
    {
      name: "My Content",
      icon: <FaVideo />,
      path: `/dashboard/${userName}`,
      color: "from-purple-500 to-indigo-500",
      emoji: "🎬",
    },
    { name: "Collections", icon: <FaFolder />, path: "/uploadVideo", color: "from-orange-500 to-red-500", emoji: "📁" },
    {
      name: "Playlist",
      icon: <FaUsers />,
      path: `/playlist/${id}`,
      color: "from-green-500 to-emerald-500",
      emoji: "🎵",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen p-4 w-60 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-5 w-20 h-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-5 w-16 h-16 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Logo Section */}
        <div className="mb-8 text-center">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl mb-4 animate-pulse">
            <FaVideo className="text-3xl text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Navigation
          </h2>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInLeft 0.6s ease-out forwards",
              }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 shadow-lg hover:shadow-2xl">
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
                ></div>

                <div className="relative z-10 flex items-center gap-4 px-4 py-3">
                  {/* Icon with animated background */}
                  <div
                    className={`relative p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white text-lg">{item.icon}</span>
                    <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Text with emoji */}
                  <div className="flex-1">
                    <span className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {item.emoji}
                      </span>
                      {item.name}
                    </span>
                  </div>

                  {/* Arrow indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}
                ></div>
              </div>
            </li>
          ))}
        </ul>

        {/* Bottom decoration */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-full border border-gray-600/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 font-medium">Online</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Sidebar
