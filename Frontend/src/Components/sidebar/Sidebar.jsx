"use client"

import { useNavigate } from "react-router-dom"
import { FaHome, FaThumbsUp, FaVideo, FaFolder, FaUsers, FaTwitter, FaChevronRight } from "react-icons/fa"
import { useSelector } from "react-redux"

function Sidebar() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)
  const id = user?.data?.data?._id || ""
  const userName = user?.data?.data?.userName || "me"

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/", color: "from-blue-500 to-cyan-500", emoji: "🏠", hoverColor: "hover:from-blue-600 hover:to-cyan-600" },
    { name: "Liked Videos", icon: <FaThumbsUp />, path: "/likedVideos", color: "from-red-500 to-pink-500", emoji: "❤️", hoverColor: "hover:from-red-600 hover:to-pink-600" },
    { name: "Tweets", icon: <FaTwitter />, path: `/user/${id}`, color: "from-cyan-500 to-blue-500", emoji: "🐦", hoverColor: "hover:from-cyan-600 hover:to-blue-600" },
    {
      name: "My Content",
      icon: <FaVideo />,
      path: `/dashboard/${userName}`,
      color: "from-purple-500 to-indigo-500",
      emoji: "🎬",
      hoverColor: "hover:from-purple-600 hover:to-indigo-600"
    },
    { name: "Collections", icon: <FaFolder />, path: "/uploadVideo", color: "from-orange-500 to-red-500", emoji: "📁", hoverColor: "hover:from-orange-600 hover:to-red-600" },
    {
      name: "Playlist",
      icon: <FaUsers />,
      path: `/playlist/${id}`,
      color: "from-green-500 to-emerald-500",
      emoji: "🎵",
      hoverColor: "hover:from-green-600 hover:to-emerald-600"
    },
  ]

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900 text-white min-h-screen p-6 w-64 overflow-hidden border-r border-white/10">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating orbs */}
        <div className="absolute top-12 right-6 w-24 h-24 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-24 left-6 w-20 h-20 bg-blue-500/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-500"></div>
        
        {/* Additional ambient lights */}
        <div className="absolute top-1/4 left-2 w-16 h-16 bg-cyan-400/15 rounded-full filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/3 right-2 w-14 h-14 bg-yellow-400/10 rounded-full filter blur-xl animate-pulse animation-delay-3000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Logo Section */}
        <div className="mb-10 text-center">
          <div className="relative inline-block mb-6">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-40 scale-110 animate-pulse"></div>
            
            {/* Main logo container */}
            <div className="relative p-5 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
              <FaVideo className="text-4xl text-white group-hover:rotate-12 transition-transform duration-300" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-wide">
            Navigation
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto opacity-60"></div>
        </div>

        {/* Enhanced Menu Items */}
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-x-1"
              style={{
                animationDelay: `${index * 120}ms`,
                animation: "slideInLeft 0.7s ease-out forwards",
              }}
            >
              {/* Main container */}
              <div className="relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl group-hover:shadow-purple-500/20">
                
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-15 transition-all duration-300 rounded-2xl`}></div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 px-5 py-4">
                  {/* Enhanced Icon Container */}
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br ${item.color} ${item.hoverColor} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-white text-xl relative z-10">{item.icon}</span>
                    
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Outer glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${item.color} rounded-xl opacity-0 group-hover:opacity-50 blur-sm transition-all duration-300 -z-10`}></div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 filter drop-shadow-lg">
                        {item.emoji}
                      </span>
                      <span className="font-bold text-gray-200 group-hover:text-white transition-colors duration-300 text-lg tracking-wide truncate">
                        {item.name}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Arrow Indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-in-out"></div>
                </div>

                {/* Outer glow effect */}
                <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300 -z-10`}></div>
              </div>

              {/* Active indicator line */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 group-hover:w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full transition-all duration-300 -translate-x-1"></div>
            </div>
          ))}
        </nav>

        {/* Enhanced Bottom Section */}
        <div className="mt-12 space-y-6">
          {/* Online Status */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white font-semibold tracking-wide transition-colors duration-300">
                Online
              </span>
            </div>
          </div>

          {/* User Info Section */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  Welcome back!
                </p>
                <p className="text-gray-400 text-xs truncate">
                  @{userName}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        /* Custom scrollbar for sidebar content */
        .sidebar-content::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        .sidebar-content::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 2px;
        }

        .sidebar-content::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }
      `}</style>
    </div>
  )
}

export default Sidebar