import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../functionalities/user';
import { login, logout } from '../store/authSlice';
import Sidebar from './sidebar/Sidebar';
import videoService from '../functionalities/video'; // Import video service

function Home() {
  const loginStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);

  // ✅ Check if user is logged in
  useEffect(() => {
    async function checkUser() {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      } catch (error) {
        console.error("Error checking user: ", error);
      }
    }
    checkUser();
  }, [dispatch]);

  // ✅ Fetch videos from backend
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await videoService.getAllVideos();
        console.log("response ",response)
        setVideos(response.data.docs); // Correct path to docs
      } catch (error) {
        console.error("Error loading videos: ", error);
      }
    }

    if (loginStatus) {
      fetchVideos();
    }
  }, [loginStatus]);

  if (!loginStatus) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Please <span className="mx-2 font-semibold text-blue-500">Log In</span> to access the content
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-60 border-r border-zinc-800 bg-zinc-900">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6">
        <h1 className="text-3xl font-bold mb-6">🔥 Trending Videos</h1>

        {videos.length === 0 ? (
          <p className="text-gray-400 text-center">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">{video.title}</h2>
                  <p className="text-sm text-gray-400">@{video.owner?.userName}</p>
                  <p className="text-sm text-gray-400">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
