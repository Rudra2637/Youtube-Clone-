import React from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { login } from '../store/authSlice'

function SignUp() {
    const {register,handleSubmit} = useForm()
    const dispatch = useDispatch()

    const handlecClick = (data) => {
    }

    return (
        <form onSubmit = {handleSubmit(handlecClick)} >
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName",{required:true})}
                />
                <label htmlFor="userName">UserName</label>
                <input
                type="text"
                id="userName"
                placeholder="Enter your username"
                {...register("userName",{required:true})}
                />
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email",{required:true})}
                />
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password",{required:true})}
                />
                <label htmlFor="Avatar">Avatar</label>
                <input
                type="file"
                id="Avatar"
                placeholder="Upload your avatar"
                {...register("avatar",{required:true})}
                />
                <label htmlFor="CoverImage">Cover Image</label>
                <input
                type="file"
                id="CoverImage"
                placeholder="Upload your CoverImage"
                {...register("CoverImage")}
                />
                <button>Sign Up</button>
            </div>
        </form>
    )
}

export default SignUp