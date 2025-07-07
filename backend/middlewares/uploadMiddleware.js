import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure uploads directory exists
const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
    try {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log("Created uploads directory");
    } catch (error) {
        console.error("Failed to create uploads directory:", error);
    }
}

//configure multer storage
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, uploadsDir)
    },
    filename:(req,file,cb) =>{
        cb(null , `${Date.now()}-${file.originalname}`);
    }
});

//file filter 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false);
    }
};

//initialize multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

//export the upload middleware
export const uploadMiddleware = upload.single('image');    