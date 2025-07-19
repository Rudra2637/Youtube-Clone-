import { useSelector } from 'react-redux'
import Header from './Components/header/Header'
import Sidebar from './Components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'


function App() {
  
  // if(loginStatus){
  //   const userName = useSelector((state) => state.auth.user?.userName)
  //   console.log("App userName:", userName)
  // }
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
        
          
          
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        
    </div>
  )
}

export default App
