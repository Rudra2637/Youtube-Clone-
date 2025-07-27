"use client"

import { useEffect, useState } from "react"
import tweetService from "../../functionalities/tweets"
import { useParams } from "react-router-dom"

function Tweet() {
  const [tweets, setTweets] = useState([])
  const { id } = useParams()
  const [text, setText] = useState("")
  const [editingTweetId, setEditingTweetId] = useState(null)
  const [editedText, setEditedText] = useState("")

  // Fetch user's tweets
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await tweetService.getUserTweet(id)
        setTweets(response.data)
      } catch (error) {
        console.error("Error in fetching tweets ", error)
      }
    }
    fetchTweets()
  }, [id])

  const tweetCreate = async () => {
    if (!text.trim()) return

    try {
      const response = await tweetService.createTweet(text)
      setText("")
      setTweets((prev) => [response.data, ...prev])
    } catch (error) {
      console.error("Error in creating tweet ", error)
    }
  }

  const handleUpdate = async (tweetId) => {
    try {
      const response = await tweetService.updateTweet(tweetId, editedText)
      setTweets((prevTweets) =>
        prevTweets.map((tweet) => (tweet._id === tweetId ? { ...tweet, content: editedText } : tweet)),
      )
      setEditingTweetId(null)
      setEditedText("")
    } catch (error) {
      console.error("Error in updating tweet", error)
    }
  }

  const handleDelete = async (tweetId) => {
    try {
      await tweetService.deleteTweet(tweetId)
      setTweets((prev) => prev.filter((tweet) => tweet._id !== tweetId))
    } catch (error) {
      console.error("Error in deleting tweet", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-cyan-900 text-white px-4 py-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 animate-pulse">
            🐦 Tweet Anonymously
          </h1>
          <p className="text-xl text-gray-300">Share your thoughts with the world anonymously</p>
        </div>

        {/* Tweet Input Box */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-6 rounded-3xl mb-8 shadow-2xl border border-gray-700/50 hover:shadow-cyan-500/20 transition-all duration-500">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl animate-pulse">
              ✨
            </div>
            <div className="flex-1">
              <textarea
                className="w-full bg-gray-800/50 text-white p-4 rounded-2xl border-2 border-gray-600/50 focus:outline-none focus:border-cyan-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500 resize-none placeholder-gray-400"
                rows={4}
                placeholder="What's happening in your world? ✨"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-400">{text.length}/280 characters</div>
                <button
                  onClick={tweetCreate}
                  disabled={!text.trim()}
                  className="group relative px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
                  <span className="relative flex items-center">
                    🚀 Tweet
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </div>

        {/* Tweets List */}
        {tweets.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
              <div className="text-6xl mb-4 animate-bounce">🐣</div>
              <p className="text-2xl text-gray-400 mb-2">No tweets yet</p>
              <p className="text-gray-500">Be the first to share something amazing!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {tweets.map((tweet, index) => (
              <div
                key={tweet._id}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] transform"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {/* Tweet Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-lg">
                      🐦
                    </div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(tweet.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {editingTweetId === tweet._id ? (
                      <>
                        <button
                          className="group relative px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl transition-all duration-300 hover:scale-105"
                          onClick={() => handleUpdate(tweet._id)}
                        >
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save
                          </span>
                        </button>
                        <button
                          className="group relative px-4 py-2 text-sm bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 rounded-xl transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            setEditingTweetId(null)
                            setEditedText("")
                          }}
                        >
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Cancel
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="group relative px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            setEditingTweetId(tweet._id)
                            setEditedText(tweet.content)
                          }}
                        >
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </span>
                        </button>
                        <button
                          className="group relative px-4 py-2 text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl transition-all duration-300 hover:scale-105"
                          onClick={() => handleDelete(tweet._id)}
                        >
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Tweet Content */}
                {editingTweetId === tweet._id ? (
                  <textarea
                    className="w-full bg-gray-800/50 text-white p-4 rounded-xl border-2 border-gray-600/50 focus:outline-none focus:border-cyan-500 focus:bg-gray-800 transition-all duration-300 resize-none"
                    rows={3}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                ) : (
                  <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30">
                    <p className="text-lg leading-relaxed">{tweet.content}</p>
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
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
      `}</style>
    </div>
  )
}

export default Tweet
