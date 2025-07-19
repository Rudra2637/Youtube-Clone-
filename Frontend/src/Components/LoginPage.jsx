import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import authService from '../functionalities/user'

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const handleClick = async (data) => {
        setError("")
        try {
            const user = await authService.login(data)
            if(user){
                console.log("Login successful:", user)
                dispatch(login({ userData: user }))
                navigate('/')
            }
        }
        catch(err){
            console.error(err)
            setError(err.response?.data?.message || "Invalid credentials")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <form 
                onSubmit={handleSubmit(handleClick)}
                className="bg-black p-8 rounded-lg border border-gray-700 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-purple-500">
                    Login to your account
                </h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="userName" className="block mb-1">Username</label>
                        <input
                            type="text"
                            id="userName"
                            placeholder="Enter your username"
                            {...register("userName")}
                            className="w-full p-2 rounded bg-black border border-gray-600 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="w-full p-2 rounded bg-black border border-gray-600 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register("password")}
                            className="w-full p-2 rounded bg-black border border-gray-600 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full py-2 rounded border border-purple-500 hover:bg-purple-600 transition"
                    >
                        Login
                    </button>

                    {error && (
                        <div className="mt-4 text-red-500 text-center">
                            {error}
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default LoginPage
