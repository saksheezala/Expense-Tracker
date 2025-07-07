import multer from "multer";

//configure multer storage
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'uploads/')
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
    fileFilter: fileFilter
});

//export the upload middleware
export const uploadMiddleware = upload.single('image');
// This middleware will handle single file uploads with the field name 'image'.
// You can change 'image' to whatever field name you are using in your form.    