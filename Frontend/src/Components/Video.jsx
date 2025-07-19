import React from 'react';

function Video({ 
  thumbnail, 
  duration, 
  title, 
  userName, 
  userAvatar, 
  views, 
  uploadedAt 
}) {
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden shadow-md border border-gray-800 hover:scale-105 transition-transform duration-300 max-w-sm">

      {/* Thumbnail + duration overlay */}
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 text-xs rounded">
          {duration}s
        </span>
      </div>

      {/* Video info */}
      <div className="flex p-4">
        <img 
          src={userAvatar} 
          alt={userName} 
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-purple-400">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">
            {userName}
          </p>
          <p className="text-gray-500 text-xs">
            {views} views • {uploadedAt}
          </p>
        </div>
      </div>

    </div>
  );
}

export default Video;
