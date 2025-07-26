"use client"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaVideo, FaSearch, FaBell, FaUser } from "react-icons/fa"
import authService from "../../functionalities/user"
import { logout } from "../../store/authSlice"
import { Link } from "react-router-dom"

function Header() {
  const loginStatus = useSelector((state) => state.auth.status)
  const user = useSelector((state) => state.auth.userData)
  const userName = user?.data?.data?.userName || "me"
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await authService.logout(token);

      if (response) {
        localStorage.removeItem("accessToken");
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.error("Error Logging out: ", error);
    }
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white sticky top-0 z-50 shadow-2xl border-b border-gray-700/50 backdrop-blur-xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div
          className="group flex items-center gap-3 text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <div className="relative p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
            <FaVideo className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-red-300 transition-all duration-300">
            MyTube
          </span>
        </div>

        {/* Search bar */}
        {loginStatus && (
          <div className="flex-1 mx-8 hidden md:flex max-w-2xl">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for amazing content..."
                  className="w-full px-6 py-3 pr-12 rounded-full border-2 border-gray-600/50 bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500"
                />
                <button className="absolute right-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110 shadow-lg">
                  <FaSearch className="text-white text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {loginStatus ? (
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="group relative p-3 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-110">
                <FaBell className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>

              {/* Profile */}
              <Link to={`/dashboard/${userName}`}>
                <button className="group relative p-3 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-110">
                  <FaUser className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                </button>
              </Link>

              {/* Logout */}
              <button
                onClick={handleClick}
                className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/30"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-rose-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
                <span className="relative flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="group relative px-6 py-3 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600/50 hover:border-green-500/70 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-700/80"
              >
                <span className="text-gray-300 group-hover:text-green-400 transition-colors duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </span>
              </button>

              <button
                onClick={() => navigate("/signUp")}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
                <span className="relative flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Sign Up
                </span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
