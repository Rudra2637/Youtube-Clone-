import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Home() {
    const loginStatus = useSelector((state) => state.auth.status)
    

    return (
        <div className="bg-black min-h-screen text-white">
            {!loginStatus ? (
                
                <div className="flex items-center justify-center h-[80vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Please Login to view content</h2>
                        <p className="text-gray-400">Access your videos, history, and more by logging in.</p>
                    </div>
                </div>
            ) : (
                <div className="text-shadow-amber-100">Login Success</div>
            )}
        </div>
    )
}

export default Home