import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../middlewares/cloudinaryUpload.js";

import{
    registerUser,
    loginUser,
    getUserInfo,
} from "../controllers/User.controller.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(protect , getUserInfo);

router.route("/upload-image").post((req, res, next) => {
    uploadMiddleware(req, res, (err) => {
        if (err) {
            console.error("Upload middleware error:", err);
            return res.status(400).json({ 
                success: false,
                message: "File upload failed", 
                error: err.message 
            });
        }
        
        if(!req.file) {
            return res.status(400).json({ 
                success: false,
                message: "No file uploaded" 
            });
        }
        
        try {
            // For Cloudinary uploads, the URL is in req.file.path
            // For memory storage (local), we'd need different handling
            const imageUrl = req.file.path || req.file.secure_url || `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            
            res.status(200).json({ 
                success: true,
                message: "File uploaded successfully", 
                imageUrl 
            });
        } catch (error) {
            console.error("Upload response error:", error);
            res.status(500).json({ 
                success: false,
                message: "Error processing upload", 
                error: error.message 
            });
        }
    });
})

export default router;