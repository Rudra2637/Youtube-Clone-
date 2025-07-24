"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../functionalities/user";
import videoService from "../functionalities/video";

function Dashboard() {
  const { userName } = useParams();
  const [channel, setChannel] = useState(null);
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const profileData = await authService.getUserChannelProfile(userName);
        setChannel(profileData.data);
        setFullName(profileData.data.data.fullName || "");
        setEmail(profileData.data.data.email || "");

        const statsData = await videoService.getChannelStats();
        const videoList = await videoService.getChannelVideos();

        setStats(statsData.data);
        setVideos(videoList.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [userName]);

  const handleUpdate = async () => {
    try {
      setError("");
      await authService.updateAccount(fullName, email);
      setChannel((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          fullName,
          email,
          coverImage: prev.data.coverImage,
          avatar: prev.data.avatar,
          userName: prev.data.userName,
        },
      }));
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Try again.");
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-400 p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <img src={channel.data.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
          ✨ Channel Dashboard
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <div className="relative group">
          <img
            src={channel.data.avatar || "/placeholder.svg"}
            alt={channel.data.userName}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {editing ? (
          <div className="text-center md:text-left flex-1 space-y-2">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
              placeholder="Email"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">{channel.data.fullName}</h1>
            <p className="text-xl text-gray-300 mb-1">@{channel.data.userName}</p>
            <p className="text-gray-400">{channel.data.email}</p>
            <button
              onClick={() => setEditing(true)}
              className="mt-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-purple-300 mb-4">Uploaded Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-purple-500/30 transition"
          >
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold mb-1 text-white">{video.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;