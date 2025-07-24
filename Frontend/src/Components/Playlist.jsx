"use client"

import { useEffect, useState } from "react"
import playlistService from "../functionalities/playlist"
import { useParams, Link } from "react-router-dom"
import { FaPlus, FaPlay, FaTimes, FaMusic } from "react-icons/fa"
import videoService from "../functionalities/video"
import moment from "moment"

function Playlist() {
  const { id } = useParams()
  const [playlists, setPlaylists] = useState([])
  const [videos, setVideos] = useState([])
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
  const [creating, setCreating] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")

  const fetchPlaylist = async () => {
    try {
      const response = await playlistService.getUserPlaylist(id)
      setPlaylists(response.data || [])
    } catch (error) {
      console.error("Error in fetching user playlist", error)
    }
  }

  useEffect(() => {
    fetchPlaylist()
  }, [id])

  const handleAddVideoClick = async (playlistId) => {
    try {
      const response = await videoService.getAllVideos()
      setVideos(response.data.docs || [])
      setSelectedPlaylistId(playlistId)
    } catch (error) {
      console.error("Error in fetching videos ", error)
    }
  }

  const handleVideoSelect = async (videoId) => {
    if (!selectedPlaylistId) return

    try {
      await playlistService.addVideo(videoId, selectedPlaylistId)
      await fetchPlaylist()
      setSelectedPlaylistId(null)
      setVideos([])
    } catch (error) {
      console.error("Error in adding video to playlist ", error)
    }
  }

  const handleRemoveVideo = async (videoId, playlistId) => {
    try {
      await playlistService.removeVideo(videoId, playlistId)
      await fetchPlaylist()
    } catch (error) {
      console.error("Error removing video from playlist", error)
    }
  }

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return
    try {
      await playlistService.createPlaylist(newPlaylistName, id)
      setCreating(false)
      setNewPlaylistName("")
      await fetchPlaylist()
    } catch (error) {
      console.error("Error creating playlist", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white px-6 py-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 animate-pulse">
              🎵 Your Music Universe
            </h1>
            <p className="text-xl text-gray-300">Organize your favorite videos into beautiful playlists</p>
          </div>

          <button
            onClick={() => setCreating(true)}
            className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
            <span className="relative flex items-center gap-2">
              <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
              Create Playlist
            </span>
          </button>
        </div>

        {playlists.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
              <div className="text-6xl mb-4 animate-bounce">🎼</div>
              <p className="text-2xl text-gray-400 mb-2">No playlists yet</p>
              <p className="text-gray-500">Create your first playlist to get started!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {playlists.map((playlist, playlistIndex) => (
              <div
                key={playlist._id}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-[1.02]"
                style={{
                  animationDelay: `${playlistIndex * 200}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                {/* Playlist Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                      <FaMusic className="text-2xl text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {playlist.name}
                      </h2>
                      <p className="text-gray-400">
                        {playlist.videoArr?.length || 0} videos • Created {moment(playlist.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>

                  <button
                    className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    onClick={() => handleAddVideoClick(playlist._id)}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
                    <span className="relative flex items-center gap-2">
                      <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                      Add Video
                    </span>
                  </button>
                </div>

                {/* Videos Grid */}
                {playlist.videos?.length === 0 || playlist.videoArr?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-block p-6 bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600/30">
                      <div className="text-4xl mb-2">📺</div>
                      <p className="text-gray-400">No videos in this playlist</p>
                      <p className="text-gray-500 text-sm">Add some videos to get started!</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {playlist.videoArr.map((video, videoIndex) => (
                      <div
                        key={video._id}
                        className="group relative bg-gradient-to-br from-gray-700/80 to-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/50 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105"
                        style={{
                          animationDelay: `${videoIndex * 100}ms`,
                          animation: "slideInUp 0.6s ease-out forwards",
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="relative overflow-hidden">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Play overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                              <FaPlay className="text-white text-lg" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-4 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {video.views} views
                          </p>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <Link to={`/video/${video._id}`} state={{ video }} className="block">
                              <button className="group relative w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                                <FaPlay className="group-hover:scale-110 transition-transform duration-300" />
                                Watch Now
                              </button>
                            </Link>

                            <button
                              className="group relative w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                              onClick={() => handleRemoveVideo(video._id, playlist._id)}
                            >
                              <FaTimes className="group-hover:rotate-90 transition-transform duration-300" />
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Playlist glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* Video Selection Modal */}
        {selectedPlaylistId && videos.length > 0 && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 shadow-2xl">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    ✨ Choose Videos to Add
                  </h2>
                  <p className="text-gray-400 mt-1">Select videos to add to your playlist</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlaylistId(null)
                    setVideos([])
                  }}
                  className="group relative p-3 bg-red-600/20 hover:bg-red-600/30 rounded-full border border-red-500/50 transition-all duration-300 hover:scale-110"
                >
                  <FaTimes className="text-red-400 group-hover:text-red-300 group-hover:rotate-90 transition-all duration-300" />
                </button>
              </div>

              {/* Videos Grid */}
              <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videos.map((video, index) => (
                    <div
                      key={video._id}
                      className="group relative cursor-pointer bg-gradient-to-br from-gray-700/80 to-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/50 hover:border-indigo-500/70 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105"
                      onClick={() => handleVideoSelect(video._id)}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeInScale 0.6s ease-out forwards",
                      }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-indigo-500/80 backdrop-blur-sm rounded-full p-2">
                            <FaPlus className="text-white text-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">{video.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Playlist Modal */}
        {creating && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700/50">
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4">
                  <FaMusic className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Create New Playlist
                </h2>
                <p className="text-gray-400 mt-1">Give your playlist a memorable name</p>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-300 group-focus-within:text-indigo-400 transition-colors">
                    🎵 Playlist Name
                  </label>
                  <input
                    type="text"
                    placeholder="My Awesome Playlist"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="w-full p-4 rounded-xl bg-gray-800/50 border-2 border-gray-600/50 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 placeholder-gray-400"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCreating(false)}
                    className="flex-1 px-4 py-3 bg-gray-700/80 hover:bg-gray-600/80 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePlaylist}
                    className="group relative flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
                    <span className="relative">Create</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  )
}

export default Playlist
