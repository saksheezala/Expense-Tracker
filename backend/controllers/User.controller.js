import jwt from 'jsonwebtoken';
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/User.model.js";

//generateToken function to create a JWT token
const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
}

//Register function 
const registerUser = asyncHandler(async (req , res) =>{
    
    if (!req.body || typeof req.body !== "object") {
        throw new ApiError(400, "Invalid or missing request body");
    }
    const {fullName , email , password , profileImageUrl} = req.body;

    //check for missing fields
    if(!fullName || !email || !password){
        throw new ApiError(400, "Please fill all the fields");
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new ApiError(400, "User already exists with this email");
    }

    //create new user
    const user = await User.create({
        fullName,
        email,
        password,
        profileImageUrl
    });

    //return success response 
    res.status(201).json(
        new ApiResponse(201, {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            },
            token: generateToken(user._id)
        }, "User registered successfully")
    );
})

const loginUser = asyncHandler(async (req , res) =>{
    const {email, password} = req.body;

    //validate request body
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

   const user = await  User.findOne({ email })

   if(!user || (await !user.comparePassword(password))){
        throw new ApiError(401, "Invalid credentials");
   }

    //return success response
    res.status(200).json(
        new ApiResponse(200, {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            },
            token: generateToken(user._id)
        }, "User logged in successfully")
    );
})

const getUserInfo = asyncHandler(async (req , res) =>{
    const userId = req.user.id;

    //find user by id
    const user = await User.findById(userId).select("-password");

    if(!user){
        throw new ApiError(404, "User not found");
    }

    //return success response
    res.status(200).json(
        new ApiResponse(200, {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            }
        }, "User information retrieved successfully")
    );
})



export {
    registerUser,
    loginUser,
    getUserInfo,
    generateToken   
}
