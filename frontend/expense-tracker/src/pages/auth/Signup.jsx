import React, { useState ,useContext} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from '../../utils/apiPaths'
import {UserContext} from '../../context/UserContext'
import uploadImage from '../../utils/uploadImage'

const Signup = () => {
  const[profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

   const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!profilePic) {
      setError("Please select a profile picture.");
      return;
    }

    if (!fullName) {
      setError("Full name is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(null); // Clear any previous errors

    // Signup API call
    try {
      let profileImageUrl = "";
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
    
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl 
      });
    
      const { token, user } = response.data?.data || response.data;
    
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      } else {
        console.warn("No token in response");
      }
      
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Signup failed");
      }
    }
    
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Your Full Name"
              label="Full Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="abc@example.com"
              label="Email Address"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Min 8 characters"
                label="password"
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}
          
          <button type='submit' className='btn-primary'>SIGN UP</button>
          
          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an Account {""}
            <Link className='font-meduim text-violet-700 underline' to="/login">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup