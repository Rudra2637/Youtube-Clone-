"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import authService from "../functionalities/user"
import { useNavigate } from "react-router-dom"

function SignUp() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleClick = async (data) => {
    // console.log("Data submitted:", data);
    setError("")
    setLoading(true)
    try {
      const user = await authService.createAccount(data)
      if (user) {
        // ✅ Don't log in here
        navigate("/login") // Redirect to login after signup
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl text-center">
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-16 h-16 mx-auto border-4 border-purple-500/20 border-r-purple-500 rounded-full animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
              ></div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Creating Your Account
            </h3>
            <p className="text-gray-400">Please wait while we set up your profile...</p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit(handleClick)}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-bounce">🚀</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Join the Community
            </h2>
            <p className="text-gray-400">Create your account and start your journey</p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors"
              >
                ✨ Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", { required: true })}
                className="w-full p-4 rounded-xl bg-gray-800/50 border-2 border-gray-600/50 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>

            <div className="group">
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors"
              >
                👤 Username
              </label>
              <input
                type="text"
                id="userName"
                placeholder="Choose a unique username"
                {...register("userName", { required: true })}
                className="w-full p-4 rounded-xl bg-gray-800/50 border-2 border-gray-600/50 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors"
              >
                📧 Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                {...register("email", { required: true })}
                className="w-full p-4 rounded-xl bg-gray-800/50 border-2 border-gray-600/50 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>

            <div className="group">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors"
              >
                🔒 Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                {...register("password", { required: true })}
                className="w-full p-4 rounded-xl bg-gray-800/50 border-2 border-gray-600/50 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>

            <div className="group">
              <label
                htmlFor="avatar"
                className="block mb-2 text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors"
              >
                🖼️ Profile Picture
              </label>
              <input
                type="file"
                id="avatar"
                {...register("avatar", { required: true })}
                className="w-full p-4 rounded-xl bg-gray-800/50 border-2 border-gray-600/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer transition-all duration-300 hover:border-gray-500"
                disabled={loading}
              />
            </div>

            <div className="group">
              <label
                htmlFor="CoverImage"
                className="block mb-2 text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors"
              >
                🎨 Cover Image (Optional)
              </label>
              <input
                type="file"
                id="coverImage"
                {...register("coverImage")}
                className="w-full p-4 rounded-xl bg-gray-800/50 border-2 border-gray-600/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer transition-all duration-300 hover:border-gray-500"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
              <span className="relative flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    🎉 Create My Account
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center backdrop-blur-sm animate-shake">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
    </div>
  )
}

export default SignUp
