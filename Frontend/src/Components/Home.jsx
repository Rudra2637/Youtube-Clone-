// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import authService from '../functionalities/user';
// import videoService from '../functionalities/video';
// import { login, logout } from '../store/authSlice';
// import Sidebar from './sidebar/Sidebar';
// import VidTemplate from './VidTemplate'; // ✅ your video card component
// import moment from 'moment'; // ✅ for "time ago" formatting

// function Home() {
//   const loginStatus = useSelector((state) => state.auth.status);
//   const dispatch = useDispatch();
//   const [videos, setVideos] = useState([]);

//   // Auth check
//   useEffect(() => {
//     async function checkUser() {
//       try {
//         const userData = await authService.getCurrentUser();
//         if (userData) dispatch(login({ userData }));
//         else dispatch(logout());
//       } catch (error) {
//         console.error("Error checking user: ", error);
//       }
//     }
//     checkUser();
//   }, [dispatch]);

//   // Fetch all videos
//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         const response = await videoService.getAllVideos();
//         setVideos(response.data.docs || []);
//       } catch (error) {
//         console.error("Error fetching videos: ", error);
//       }
//     }

//     if (loginStatus) {
//       fetchVideos();
//     }
//   }, [loginStatus]);

//   if (!loginStatus) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
//         Please <span className="mx-2 font-semibold text-blue-500">Log In</span> to access the content
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       {/* Sidebar */}
//       <div className="w-60 border-r border-zinc-800 bg-zinc-900">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 px-6 py-6">
//         <h1 className="text-3xl font-bold mb-6">🔥 Trending Videos</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {videos.map((video) => (
//             <VidTemplate
//               key={video._id}
//               thumbnail={video.thumbnail}
//               duration={video.duration.toFixed(0)}
//               title={video.title}
//               userName={video.owner?.userName || "Unknown"}
//               userAvatar={video.owner?.avatar || "/default-avatar.png"}
//               views={video.views}
//               uploadedAt={moment(video.createdAt).fromNow()}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import authService from '../functionalities/user';
import videoService from '../functionalities/video';
import { login, logout } from '../store/authSlice';
import Sidebar from './sidebar/Sidebar';
import VidTemplate from './VidTemplate';
import moment from 'moment';

function Home() {
  const loginStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function checkUser() {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      } catch (error) {
        console.error("Error checking user: ", error);
      }
    }
    checkUser();
  }, [dispatch]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await videoService.getAllVideos();
        setVideos(response.data.docs || []);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    }

    if (loginStatus) {
      fetchVideos();
    }
  }, [loginStatus]);

  if (!loginStatus) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Please <span className="mx-2 font-semibold text-blue-500">Log In</span> to access the content
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="w-60 border-r border-zinc-800 bg-zinc-900">
        <Sidebar />
      </div>

      <div className="flex-1 px-6 py-6">
        <h1 className="text-3xl font-bold mb-6">🔥 Trending Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/video/${video._id}`}
              state={{ video }}
            >
              <VidTemplate
                thumbnail={video.thumbnail}
                duration={video.duration.toFixed(0)}
                title={video.title}
                userName={video.owner?.userName || "Unknown"}
                userAvatar={video.owner?.avatar || "/default-avatar.png"}
                views={video.views}
                uploadedAt={moment(video.createdAt).fromNow()}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
