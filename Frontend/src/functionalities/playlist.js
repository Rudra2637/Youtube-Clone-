import axios from "axios";

export class PlaylistService {
  async createPlaylist(name, content) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/`,
        {
          name: name,
          description: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in Creating Playlist", error);
      throw error;
    }
  }

  async getUserPlaylist(id) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in fetching Playlist", error);
      throw error;
    }
  }

  async addVideo(videoId, playlistId) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/add/${videoId}/${playlistId}`,
        {}, // PATCH requires a body; use empty object if none
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in adding Video", error);
      throw error;
    }
  }

  async removeVideo(videoId, playlistId) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/remove/${videoId}/${playlistId}`,
        {}, // PATCH body again
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in removing video", error);
      throw error;
    }
  }
}

const playlistService = new PlaylistService();
export default playlistService;
