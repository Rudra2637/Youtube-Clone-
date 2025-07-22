import React, { useEffect, useState } from 'react';
import playlistService from '../functionalities/playlist';
import { useParams } from 'react-router-dom';
import { FaPlus, FaPlay } from 'react-icons/fa';
import videoService from '../functionalities/video';

function Playlist() {
  const { id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  // Fetch user's playlists
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await playlistService.getUserPlaylist(id);
        setPlaylists(response.data || []);
      } catch (error) {
        console.error('Error in fetching user playlist', error);
      }
    };

    fetchPlaylist();
  }, [id]);

  // Show videos when Add button is clicked
  const handleAddVideoClick = async (playlistId) => {
    try {
      const response = await videoService.getAllVideos();
      setVideos(response.data.docs || []);
      setSelectedPlaylistId(playlistId);
    } catch (error) {
      console.error('Error in fetching videos ', error);
    }
  };

  // Add selected video to playlist
  const handleVideoSelect = async (videoId) => {
    if (!selectedPlaylistId) return;

    try {
      await playlistService.addVideo(videoId, selectedPlaylistId);

      // Update local playlist UI (optional: re-fetch)
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist._id === selectedPlaylistId) {
          return {
            ...playlist,
            videos: [...(playlist.videos || []), videos.find((v) => v._id === videoId)],
          };
        }
        return playlist;
      });

      setPlaylists(updatedPlaylists);
      setSelectedPlaylistId(null);
      setVideos([]);
    } catch (error) {
      console.error('Error in adding video to playlist ', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">🎵 Your Playlists</h1>

      {playlists.length === 0 ? (
        <p className="text-gray-400">No playlists created yet.</p>
      ) : (
        <div className="space-y-6">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{playlist.name}</h2>
                <button
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white text-sm"
                  onClick={() => handleAddVideoClick(playlist._id)}
                >
                  <FaPlus /> Add Video
                </button>
              </div>

              {playlist.videos?.length === 0 ? (
                <p className="text-gray-400">No videos in this playlist.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {playlist.videos.map((video) => (
                    <div
                      key={video._id}
                      className="bg-gray-800 rounded-md overflow-hidden hover:scale-[1.01] transition"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="text-lg font-medium truncate">{video.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{video.views} views</p>
                        <button
                          className="flex items-center gap-1 text-sm bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded text-white"
                          onClick={() => {
                            // TODO: play video
                          }}
                        >
                          <FaPlay /> Watch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal-like Video Selection */}
      {selectedPlaylistId && videos.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-start justify-center pt-20 overflow-y-auto">
          <div className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-lg border border-purple-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-400">Select a Video to Add</h2>
              <button
                onClick={() => {
                  setSelectedPlaylistId(null);
                  setVideos([]);
                }}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✖
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="cursor-pointer bg-gray-800 rounded-md overflow-hidden hover:ring-2 hover:ring-purple-600 transition"
                  onClick={() => handleVideoSelect(video._id)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-medium truncate">{video.title}</h3>
                    <p className="text-sm text-gray-400">{video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Playlist;
