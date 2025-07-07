import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from '../../utils/apiPaths'
import {UserContext} from '../../context/UserContext'

const Login = () => {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password || password.length < 8){
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(null); // Clear any previous errors

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      })
      const { token, user } = response.data.data;


      // Save token and user data to localStorage
      if(token){
        localStorage.setItem("token", token);
        updateUser(user); // Update user context
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error messages from the server
        setError(error.response.data.message || "An error occurred during login.");
      }else {
        // Handle generic error message
        setError("An error occurred during login. Please try again.");
      }
    }
  }
  return (
    <AuthLayout>

      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your credentials to log in to your account.
        </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="abc@example.com"
          label="Email Address"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Min 8 characters"
          label="password"
        />
        {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>LOGIN</button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account? {""}
          <Link className='font-meduim text-violet-700 underline' to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
      </div>
    </AuthLayout>
  )
}

export default Login