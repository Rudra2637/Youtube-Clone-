import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()

    const handleClick = (data) => {
        

    }

    return (
        <form onSubmit = {handleSubmit(handleClick)}>
            <div>
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
                <button>Submit</button>
            </div>
        </form>
    )
}

export default LoginPage