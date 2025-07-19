import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';
import authService from '../../functionalities/user';
import { logout } from '../../store/authSlice';

function Header() {
  const loginStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const response = await authService.logout();
      if (response) {
        dispatch(logout());
        navigate('/');
      }
    } catch (error) {
      console.error("Error Logging out: ", error);
    }
  };

  return (
    <header className="bg-zinc-950 text-white sticky top-0 z-50 shadow-sm border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-xl font-bold cursor-pointer text-white hover:text-purple-500 transition"
          onClick={() => navigate('/')}
        >
          <FaVideo className="text-purple-500 text-2xl" />
          MyTube
        </div>

        {/* Search bar */}
        {loginStatus && (
          <div className="flex-1 mx-8 hidden md:flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full border border-gray-600 bg-zinc-900 text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        )}

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {loginStatus ? (
            <button
              onClick={handleClick}
              className="px-4 py-2 rounded-full border border-gray-600 text-sm hover:border-purple-500 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full border border-gray-600 text-sm hover:border-purple-500 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signUp")}
                className="px-4 py-2 rounded-full border border-gray-600 font-semibold text-sm hover:border-purple-500 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
