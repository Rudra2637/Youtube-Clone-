import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../functionalities/user';
import { login, logout } from '../store/authSlice';
import Sidebar from './sidebar/Sidebar';

function Home() {
  const loginStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

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

  if (!loginStatus) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Please <span className="mx-2 font-semibold text-blue-500">Log In</span> to access the content
      </div>
    );
  }

  // Placeholder video data
  const videos = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Video Title ${i + 1}`,
    thumbnail: `https://placehold.co/300x180?text=Thumbnail+${i + 1}`,
    channel: `Channel ${i + 1}`,
    views: `${Math.floor(Math.random() * 100)}K views`,
  }));

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-60 border-r border-zinc-800 bg-zinc-900">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6">
        <h1 className="text-3xl font-bold mb-6">🔥 Trending Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={video.thumbnail}
                alt="thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p className="text-sm text-gray-400">{video.channel}</p>
                <p className="text-sm text-gray-400">{video.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
