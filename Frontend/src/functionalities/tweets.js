import axios from "axios";

export class TweetService {
  async createTweet(data) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweets/`,
        { content: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in creating tweet", error);
      throw error;
    }
  }

  async getUserTweet(id) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweets/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in fetching user Tweets", error);
      throw error;
    }
  }

  async deleteTweet(id) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleting user tweets", error);
      throw error;
    }
  }

  async updateTweet(id, data) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tweets/${id}`,
        { content: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in updating tweets", error);
      throw error;
    }
  }
}

const tweetService = new TweetService();
export default tweetService;
