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
        path:"/signUp",
        element:<SignUp/>
      },
      {
        path:"/login",
        element:<LoginPage/>
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
