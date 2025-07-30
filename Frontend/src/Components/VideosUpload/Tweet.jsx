"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import tweetService from "../../functionalities/tweets"
import { useParams } from "react-router-dom"

function Tweet() {
  const [tweets, setTweets] = useState([])
  const [text, setText] = useState("")
  const [editingTweetId, setEditingTweetId] = useState(null)
  const [editedText, setEditedText] = useState("")
  const user = useSelector((state) => state.auth.userData)
  const loggedInUserId = user?.data?.data?._id || ""
  const { id } = useParams() // user whose tweets are being viewed

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
      setTweets((prev) => [{ ...response.data, user: { _id: loggedInUserId } }, ...prev])
    } catch (error) {
      console.error("Error in creating tweet ", error)
    }
  }

  const handleUpdate = async (tweetId) => {
    try {
      await tweetService.updateTweet(tweetId, editedText)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 animate-pulse">
              🐦 TweetSphere
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full mb-4"></div>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 font-light">
            Share your thoughts with the world anonymously
          </p>
        </div>

        {/* Tweet Creation Box - Only for logged-in user viewing their own profile */}
        {loggedInUserId === id && (
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:bg-white/10">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse">
                    ✨
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="relative">
                    <textarea
                      className="w-full bg-slate-800/50 backdrop-blur-sm text-white p-6 rounded-2xl border-2 border-slate-600/30 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:border-slate-500/50 resize-none placeholder-slate-400 text-lg leading-relaxed shadow-inner"
                      rows={4}
                      placeholder="What's on your mind? Share your thoughts with the world... ✨"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      maxLength={280}
                    />
                    <div className="absolute bottom-4 right-4 text-sm text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full">
                      {text.length}/280
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-slate-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Anonymous Mode</span>
                      </div>
                    </div>

                    <button
                      onClick={tweetCreate}
                      disabled={!text.trim()}
                      className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></span>
                      <span className="relative flex items-center">
                        🚀 Share Tweet
                        <svg
                          className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform"
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
          </div>
        )}

        {/* Tweets List */}
        {tweets.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
              <div className="text-8xl mb-6 animate-bounce">🐣</div>
              <h3 className="text-3xl font-bold text-slate-300 mb-4">No tweets yet</h3>
              <p className="text-xl text-slate-400 max-w-md">Be the first to share something amazing with the world!</p>
              <div className="mt-8 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse animation-delay-400"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {tweets.map((tweet, index) => (
              <div
                key={tweet._id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 transform"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {/* Tweet Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl shadow-lg">
                      🐦
                    </div>
                    <div className="flex flex-col">
                      <div className="text-slate-400 text-sm font-medium">Anonymous User</div>
                      <div className="text-slate-500 text-xs flex items-center">
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
                  </div>

                  {/* Action Buttons - Only for tweet owner */}
                  {tweet.user?._id === loggedInUserId && (
                    <div className="flex gap-3">
                      {editingTweetId === tweet._id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(tweet._id)}
                            className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/30"
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingTweetId(null)
                              setEditedText("")
                            }}
                            className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                          >
                            ❌ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingTweetId(tweet._id)
                              setEditedText(tweet.content)
                            }}
                            className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tweet._id)}
                            className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/30"
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Tweet Content */}
                {editingTweetId === tweet._id ? (
                  <div className="relative">
                    <textarea
                      className="w-full bg-slate-800/50 backdrop-blur-sm text-white p-6 rounded-2xl border-2 border-slate-600/30 focus:outline-none focus:border-purple-500/50 transition-all duration-300 resize-none text-lg leading-relaxed shadow-inner"
                      rows={4}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      maxLength={280}
                    />
                    <div className="absolute bottom-4 right-4 text-sm text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full">
                      {editedText.length}/280
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-800/30 to-slate-700/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-600/20 shadow-inner">
                    <p className="text-lg leading-relaxed text-slate-100 font-light">{tweet.content}</p>
                  </div>
                )}
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
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </div>
  )
}

export default Tweet
