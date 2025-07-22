import React, { useEffect, useState } from 'react';
import tweetService from '../../functionalities/tweets';
import { useParams } from 'react-router-dom';

function Tweet() {
  const [tweets, setTweets] = useState([]);
  const { id } = useParams();
  const [text, setText] = useState('');
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [editedText, setEditedText] = useState('');

  // Fetch user's tweets
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await tweetService.getUserTweet(id);
        setTweets(response.data);
      } catch (error) {
        console.error('Error in fetching tweets ', error);
      }
    };
    fetchTweets();
  }, [id]);

  const tweetCreate = async () => {
    if (!text.trim()) return;

    try {
      const response = await tweetService.createTweet(text);
      setText('');
      setTweets((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error('Error in creating tweet ', error);
    }
  };

  const handleUpdate = async (tweetId) => {
    try {
      const response = await tweetService.updateTweet(tweetId, editedText);
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet._id === tweetId ? { ...tweet, content: editedText } : tweet
        )
      );
      setEditingTweetId(null);
      setEditedText('');
    } catch (error) {
      console.error('Error in updating tweet', error);
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      await tweetService.deleteTweet(tweetId);
      setTweets((prev) => prev.filter((tweet) => tweet._id !== tweetId));
    } catch (error) {
      console.error('Error in deleting tweet', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">Your Tweets</h1>

      {/* Tweet Input Box */}
      <div className="bg-gray-900 p-4 rounded-lg mb-6 shadow-md">
        <textarea
          className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring focus:border-purple-500 resize-none"
          rows={4}
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={tweetCreate}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md text-white font-semibold transition duration-150"
          >
            ➕ Tweet
          </button>
        </div>
      </div>

      {/* Tweets List */}
      {tweets.length === 0 ? (
        <p className="text-gray-400 text-center">You haven't posted any tweets yet.</p>
      ) : (
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <div
              key={tweet._id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">
                  {new Date(tweet.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-2">
                  {editingTweetId === tweet._id ? (
                    <>
                      <button
                        className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md"
                        onClick={() => handleUpdate(tweet._id)}
                      >
                        ✅ Save
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md"
                        onClick={() => {
                          setEditingTweetId(null);
                          setEditedText('');
                        }}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md"
                        onClick={() => {
                          setEditingTweetId(tweet._id);
                          setEditedText(tweet.content);
                        }}
                      >
                        ✏ Edit
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md"
                        onClick={() => handleDelete(tweet._id)}
                      >
                        🗑 Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Tweet Content */}
              {editingTweetId === tweet._id ? (
                <textarea
                  className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none resize-none"
                  rows={3}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <p className="text-lg">{tweet.content}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
