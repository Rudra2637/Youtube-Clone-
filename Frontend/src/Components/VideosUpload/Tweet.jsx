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
      setTweets((prev) => [
        { ...response.data, user: { _id: loggedInUserId } },
        ...prev
      ])
    } catch (error) {
      console.error("Error in creating tweet ", error)
    }
  }

  const handleUpdate = async (tweetId) => {
    try {
      await tweetService.updateTweet(tweetId, editedText)
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet._id === tweetId ? { ...tweet, content: editedText } : tweet
        )
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
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 animate-pulse">
            🐦 Tweet Anonymously
          </h1>
          <p className="text-xl text-gray-300">Share your thoughts with the world anonymously</p>
          <p className="text-xl text-gray-300">Can edit or delete only once so tweet wisely</p>
        </div>

        {/* Show tweet box only if logged-in user is viewing their own profile */}
        {loggedInUserId === id && (
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
        )}

        {/* Tweets list */}
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
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-lg">🐦</div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(tweet.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Only allow owner to edit/delete */}
                  {tweet.user?._id === loggedInUserId && (
                    <div className="flex gap-2">
                      {editingTweetId === tweet._id ? (
                        <>
                          <button onClick={() => handleUpdate(tweet._id)} className="px-4 py-2 text-sm bg-green-600 rounded-xl">Save</button>
                          <button onClick={() => { setEditingTweetId(null); setEditedText("") }} className="px-4 py-2 text-sm bg-gray-600 rounded-xl">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingTweetId(tweet._id); setEditedText(tweet.content) }} className="px-4 py-2 text-sm bg-blue-600 rounded-xl">Edit</button>
                          <button onClick={() => handleDelete(tweet._id)} className="px-4 py-2 text-sm bg-red-600 rounded-xl">Delete</button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {editingTweetId === tweet._id ? (
                  <textarea
                    className="w-full bg-gray-800/50 text-white p-4 rounded-xl border"
                    rows={3}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                ) : (
                  <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm p-4 rounded-xl border">
                    <p className="text-lg leading-relaxed">{tweet.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tweet