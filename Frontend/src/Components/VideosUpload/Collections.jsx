import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import videoService from '../../functionalities/video'
import { useNavigate } from 'react-router-dom'

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
      if(response){
        navigate("/video-preview", {
        state: {
            title: data.title,
            description: data.description,
            thumbnail: response.data.thumbnail, // or wherever your backend returns it
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="text-purple-500 hover:text-purple-700 font-semibold text-lg border border-purple-500 px-6 py-3 rounded-lg transition"
        >
          Want to upload a video? Click here
        </button>
      )}

      {uploadSuccess && (
        <div className="text-green-400 font-semibold mt-4">
          ✅ Video uploaded successfully!
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit(handleClick)}
          className="w-full max-w-2xl bg-zinc-900 p-8 mt-6 rounded-lg border border-gray-700 shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-purple-500">Upload Your Video</h2>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setVideoPreview(null)
                setUploadProgress(0)
                setUploadSuccess(false)
              }}
              className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
            >
              Cancel
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Video Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Enter video title"
                className="w-full p-3 bg-black border border-gray-600 rounded focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">Description</label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Write a short description"
                rows={4}
                className="w-full p-3 bg-black border border-gray-600 rounded focus:outline-none focus:border-purple-500 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("thumbnail")}
                className="w-full p-2 bg-black border border-gray-600 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">Video File</label>
              <input
                type="file"
                accept="video/*"
                {...register("video", { required: true })}
                className="w-full p-2 bg-black border border-gray-600 rounded"
                onChange={handleVideoChange}
              />
            </div>

            {videoPreview && (
              <video controls className="w-full rounded border border-gray-700">
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-800 rounded h-4 overflow-hidden">
                <div
                  className="bg-purple-600 h-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
              >
                Publish Video
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default Collections
