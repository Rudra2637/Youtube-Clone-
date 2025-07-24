"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import authService from "../functionalities/user"
import videoService from "../functionalities/video"
import { login, logout } from "../store/authSlice"
import Sidebar from "./sidebar/Sidebar"
import VidTemplate from "./VidTemplate"
import moment from "moment"

function Home() {
  const loginStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function checkUser() {
      try {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      } catch (error) {
        console.error("Error checking user: ", error)
      }
    }
    checkUser()
  }, [dispatch])

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await videoService.getAllVideos()
        setVideos(response.data.docs || [])
      } catch (error) {
        console.error("Error fetching videos: ", error)
      }
    }

    if (loginStatus) {
      fetchVideos()
    }
  }, [loginStatus])

  console.log("Videos ", videos)

  if (!loginStatus) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
          <div className="text-6xl mb-6 animate-bounce">🔐</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-300">
            Please <span className="font-bold text-blue-400">Log In</span> to access amazing content
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="w-60 border-r border-gray-700/50 bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-xl relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 px-6 py-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2 animate-pulse">
            🔥 Trending Videos
          </h1>
          <p className="text-xl text-gray-300">Discover the hottest content right now</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <Link
              key={video._id}
              to={`/video/${video._id}`}
              state={{ video }}
              className="group transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                <VidTemplate
                  thumbnail={video.thumbnail}
                  duration={video.duration.toFixed(0)}
                  title={video.title}
                  userName={video.owner[0]?.userName || "Unknown"}
                  userAvatar={video.owner[0]?.avatar || "/default-avatar.png"}
                  views={video.views}
                  uploadedAt={moment(video.createdAt).fromNow()}
                />

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Home
