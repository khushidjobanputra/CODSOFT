import multer from "multer";

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/Images/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname); // Set the file name
  },
});

// Create a Multer instance with the storage configuration
const upload = multer({ storage: storage });

// Middleware to handle file uploads
export const uploadMiddleware = upload.single('resume'); // 'file' is the name of the file input field in your form