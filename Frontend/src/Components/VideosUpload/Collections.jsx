"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import videoService from "../../functionalities/video"
import { useNavigate } from "react-router-dom"

function Collections() {
  const { register, handleSubmit, watch } = useForm()
  const [showForm, setShowForm] = useState(false)
  const [videoPreview, setVideoPreview] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const navigate = useNavigate()

  const handleClick = async (data) => {
    try {
      const response = await videoService.createVideo(data)
      console.log("Video uploaded: ", response)

      setUploadSuccess(true)
      if (response) {
        navigate("/video-preview", {
          state: {
            title: data.title,
            description: data.description,
            thumbnail: response.data.thumbnail,
            videoUrl: response.data.videoFile,
          },
        })
      }
    } catch (error) {
      console.error("Error in Uploading ", error)
      throw error
    }
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const videoURL = URL.createObjectURL(file)
      setVideoPreview(videoURL)
    } else {
      setVideoPreview(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {!showForm && (
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 animate-pulse">
              🎬 Create Amazing Content
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transform"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
              <span className="relative flex items-center">
                ✨ Upload Your Masterpiece
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {uploadSuccess && (
          <div className="text-center mb-6 animate-bounce">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-semibold shadow-lg">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Video uploaded successfully! 🎉
            </div>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit(handleClick)}
            className="w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/20"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🎥 Upload Studio
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setVideoPreview(null)
                  setUploadProgress(0)
                  setUploadSuccess(false)
                }}
                className="group relative p-3 text-red-400 border-2 border-red-500/50 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-300 group-focus-within:text-purple-400 transition-colors">
                    ✨ Video Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Give your video an amazing title..."
                    className="w-full p-4 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 placeholder-gray-400"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-300 group-focus-within:text-purple-400 transition-colors">
                    📝 Description
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    placeholder="Tell your audience what this video is about..."
                    rows={5}
                    className="w-full p-4 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 resize-none placeholder-gray-400"
                  ></textarea>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-300 group-focus-within:text-purple-400 transition-colors">
                    🖼️ Thumbnail Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      {...register("thumbnail")}
                      className="w-full p-4 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer transition-all duration-300 hover:border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-300 group-focus-within:text-purple-400 transition-colors">
                    🎬 Video File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      {...register("video", { required: true })}
                      className="w-full p-4 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer transition-all duration-300 hover:border-gray-500"
                      onChange={handleVideoChange}
                    />
                  </div>
                </div>

                {videoPreview && (
                  <div className="relative group">
                    <video
                      controls
                      className="w-full rounded-xl border-2 border-gray-700 shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      <source src={videoPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none"></div>
                  </div>
                )}

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="relative">
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300 relative overflow-hidden"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-2">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="group relative w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transform"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
                <span className="relative flex items-center justify-center">
                  🚀 Publish Your Masterpiece
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Collections
