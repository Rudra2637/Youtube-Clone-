import { useSelector } from 'react-redux'
import Header from './Components/header/Header'
import Sidebar from './Components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  const loginStatus = useSelector((state) => state.auth.status)

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      {!loginStatus ? (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Please Login to view content</h2>
            <p className="text-gray-400">Access your videos, history, and more by logging in.</p>
          </div>
        </div>
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
