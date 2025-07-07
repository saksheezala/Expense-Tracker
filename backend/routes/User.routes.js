import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

import{
    registerUser,
    loginUser,
    getUserInfo,
} from "../controllers/User.controller.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(protect , getUserInfo);

router.route("/upload-image").post(uploadMiddleware , (req , res) =>{
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "File uploaded successfully", imageUrl });
})

export default router;