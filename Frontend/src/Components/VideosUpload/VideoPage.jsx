import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import videoService from '../../functionalities/video';
import commentService from '../../functionalities/comment';

export default function VideoPage() {
  const location = useLocation();
  const { id } = useParams();
  const [videoData, setVideoData] = useState(location.state?.video || null);
  const [playVideo, setPlayVideo] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await videoService.getVideoById(id);
        const data = response.data;
        setVideoData(data);
        setLikeCount(data.likes || 0);
        setLiked(data.isLiked || false); // ← fetch like status
        console.log("VideoData", data);
      } catch (error) {
        console.error("Error in fetching video", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await commentService.getComments(id);
        setComments(response.data);
      } catch (error) {
        console.error("Error in fetching comments", error);
      }
    };

    fetchVideo();
    fetchComments();
  }, [id]);

  const addComment = async () => {
    try {
      const response = await commentService.addComment(id, newComment);
      setNewComment("");
      setComments(prev => [response, ...prev]);
    } catch (error) {
      console.error("Error in adding comment", error);
    }
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        setLiked(true)
        await videoService.likeVideo(id); // 🔧 Send like to backend
      } else {
        setLiked(false);
        await videoService.likeVideo(id); // 🔧 Send unlike to backend
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  if (!videoData) {
    return (
      <div className="text-white bg-black h-screen flex items-center justify-center">
        <p>Video data not found. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-4 py-6">
      <div className="w-full max-w-4xl mx-auto">
        {!playVideo ? (
          <div
            className="relative cursor-pointer mb-4"
            onClick={() => setPlayVideo(true)}
          >
            <img
              src={videoData.thumbnail || "/default-thumbnail.jpg"}
              alt="Video Thumbnail"
              className="w-full rounded-lg border border-gray-800"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.732z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <video
            className="w-full rounded-lg border border-gray-800 mb-4"
            controls
            autoPlay
          >
            <source src={videoData.videoFile || ""} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <h1 className="text-2xl font-semibold mb-2">{videoData.title}</h1>
        <div className="text-gray-400 text-sm mb-4">
          {videoData.views} views • {videoData.createdAt}
        </div>

        {/* Like/Dislike Buttons */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
              liked ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            👍 
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700">
            👎
          </button>
        </div>

        {/* Channel Info */}
        <div className="flex items-center justify-between border-y border-gray-800 py-4 mb-4">
          <div className="flex items-center gap-4">
            <img
              src={videoData.owner?.avatar || '/default-avatar.png'}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">{videoData.owner?.userName || 'Unknown'}</div>
              <div className="text-sm text-gray-400">{videoData.owner?.subscribers || 0} Subscribers</div>
            </div>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium">
            Subscribe
          </button>
        </div>

        {/* Video Description */}
        <div className="bg-gray-900 p-3 rounded-md mb-6">
          {videoData.description || 'No description provided.'}
        </div>

        {/* Comments Section */}
        <div className="text-lg font-semibold mb-2">Comments</div>
        <div className="flex items-start gap-3 mb-6">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-purple-500"
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium"
            onClick={addComment}
          >
            Comment
          </button>
        </div>

        <div>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li key={index} className="bg-gray-900 p-3 rounded-md flex gap-3">
                  <img
                    src={comment.avatar || '/default-avatar.png'}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">
                      {comment.userName || 'Anonymous'}
                    </div>
                    <div className="text-gray-300 text-sm">{comment.content}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
