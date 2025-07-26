import axios from "axios";

export class AuthService {
  async createAccount(data) {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.avatar?.[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    if (data.CoverImage?.[0]) {
      formData.append("coverImage", data.CoverImage[0]);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        data,
        {
          withCredentials: true,
        }
      );

      // Save token to localStorage
      const accessToken = response?.data?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async logout() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      localStorage.removeItem("accessToken");
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }

  async getUserChannelProfile(userName) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/c/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching user channel profile:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  }

  async updateAccount(fullName, email) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update-account`,
        {
          fullName,
          email,
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
      console.error("Error updating account:", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
