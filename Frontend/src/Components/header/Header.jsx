import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaVideo } from 'react-icons/fa'
import authService from '../../functionalities/user'
import { logout } from '../../store/authSlice'

function Header() {
  const loginStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async () => {
    try {
      const response = await authService.logout()
      if (response) {
        dispatch(logout())
        navigate('/')
      }
    } catch (error) {
      console.error("Error Logging out: ", error)
    }
  }

  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <FaVideo className="text-purple-500 text-2xl" />
          <span className="font-bold text-lg">MyTube</span>
        </div>

        {/* Search & Logout */}
        {loginStatus && (
          <div className="flex-1 mx-8 flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded border border-gray-600 bg-black text-white focus:outline-none focus:border-purple-500"
            />
            <button 
              onClick={handleClick}
              className="px-4 py-2 border border-gray-400 rounded hover:border-purple-500"
            >
              LogOut
            </button>
          </div>
        )}

        {/* Auth Buttons */}
        {!loginStatus && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-gray-400 rounded hover:border-purple-500"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signUp")}
              className="px-4 py-2 border border-gray-400 rounded font-semibold hover:border-purple-500"
            >
              Sign up
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
