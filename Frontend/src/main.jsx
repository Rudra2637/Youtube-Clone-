import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Header from './Components/header/Header.jsx'
import { Provider } from 'react-redux'
import Sidebar from './Components/sidebar/Sidebar.jsx'
import store from './store/store.js'
import SignUp from './Components/SignUp.jsx'
import LoginPage from './Components/LoginPage.jsx'
import Home from './Components/Home.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Collections from './Components/VideosUpload/Collections.jsx'
import VideoPreview from './Components/VideosUpload/VideoPreview.jsx'
import LikedVideos from './Components/LikedVideos.jsx'
import VideoPage from './Components/VideosUpload/VideoPage.jsx'
import Tweet from './Components/VideosUpload/Tweet.jsx'
import AuthLayout from "./Components/AuthLayout.jsx"
import Playlist from './Components/Playlist.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      // {
      //   path:"/header",
      //   element:<Header/>,
      // },
      // {
      //   path:"/footer",
      //   element:<Sidebar/>
      // }
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/signUp",
        element:(
          <AuthLayout authentication = {false}>
             <SignUp/>
          </AuthLayout>
         
        )
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <LoginPage/>
          </AuthLayout>
        )
      },
      {
        path:"/dashboard/:userName",
        element:(
          <AuthLayout authentication>
            {" "}
            <Dashboard/>
          </AuthLayout>
        )
      },
      {
        path:"/uploadVideo",
        element:(
          <AuthLayout authentication>
            {" "}
            <Collections/>
          </AuthLayout>
        )
      },
      {
        path:"/video-preview",
        element:(
          <AuthLayout authentication>
            {" "}
            <VideoPreview/>
          </AuthLayout>
        )
      },
      {
        path:"/likedVideos",
        element:(
          <AuthLayout authentication>
            {" "}
            <LikedVideos/>
          </AuthLayout>
        )
      },
      {
        path:"/video/:id",
        element:(
          <AuthLayout authentication>
            {" "}
            <VideoPage/>
          </AuthLayout>
        )
      },
      {
        path:"/user/:id",
        element:(
          <AuthLayout authentication>
            {" "}
            <Tweet/>
          </AuthLayout>
        )
      },
      {
        path:"/playlist/:id",
        element:(
          <AuthLayout authentication>
            {" "}
            <Playlist/>
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
       <RouterProvider router = {router}/>
    </Provider>
   
  </StrictMode>,
)
