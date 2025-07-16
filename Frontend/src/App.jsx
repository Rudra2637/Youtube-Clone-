import { useSelector } from 'react-redux'
import Header from './Components/header/Header'
import Sidebar from './Components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  const loginStatus = useSelector((state) => state.auth.status)

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
        
          {loginStatus && 
          <div className="flex">
            <Sidebar />
          </div>
          }
          
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        
    </div>
  )
}

export default App
