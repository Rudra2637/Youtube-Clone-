"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../functionalities/user";
import videoService from "../functionalities/video";
import { login, logout } from "../store/authSlice";
import Sidebar from "./sidebar/Sidebar";
import VidTemplate from "./VidTemplate";
import moment from "moment";

function Home() {
  const loginStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const hasWelcomed = useRef(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user: ", error);
      }
    }
    checkUser();
  }, [dispatch]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await videoService.getAllVideos();
        setVideos(response.data.docs || []);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    }

    if (loginStatus) {
      fetchVideos();
    }
  }, [loginStatus]);

  if (!loginStatus) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white relative overflow-hidden">
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
           <p className="mb-4 text-gray-300">
              📌 <strong>IMPORTANT NOTICE:</strong> This is a full-stack demonstration project built to showcase my development skills.
              Kindly avoid uploading long videos (preferably under 2-3 minutes) to ensure performance.
            </p>
            <p className="text-sm text-green-400">💚 Thank you for checking out the project!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:100px_100px] opacity-30"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
      </div>

      {/* Enhanced Sidebar */}
      <div className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl relative z-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="relative z-10">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-8 py-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="text-7xl animate-pulse filter drop-shadow-lg mr-4">🔥</div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-orange-400 via-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse tracking-tight">
              Trending Videos
            </h1>
          </div>
          <p className="text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">hottest content</span> right now
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Enhanced Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Link
              key={video._id}
              to={`/video/${video._id}`}
              state={{ video }}
              className="group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 group-hover:border-purple-400/50">
                
                <div className="relative z-10">
                  <VidTemplate
                    thumbnail={video.thumbnail}
                    duration={video.duration.toFixed(0)}
                    title={video.title}
                    userName={video.owner[0]?.userName || "Unknown"}
                    userAvatar={video.owner[0]?.avatar || "/default-avatar.png"}
                    views={video.views}
                    uploadedAt={moment(video.createdAt).fromNow()}
                  />
                </div>

                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10"></div>
                
                
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out"></div>
                </div>

                
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4 opacity-50">📹</div>
            <p className="text-xl text-gray-400 mb-2">No videos available</p>
            <p className="text-gray-500">Check back later for new content!</p>
          </div>
        )}
      </div>

      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Custom scrollbar */
        .flex-1::-webkit-scrollbar {
          width: 8px;
        }

        .flex-1::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }

        .flex-1::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 4px;
        }

        .flex-1::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }

        /* Responsive improvements */
        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .text-6xl {
            font-size: 3rem;
          }
          
          .text-7xl {
            font-size: 4rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;