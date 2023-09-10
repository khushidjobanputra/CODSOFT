import jwt from 'jsonwebtoken'
import user from '../models/user';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage }); 

export const uploadResume = upload.single('resume'); 

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token format' });
    }

    // Verify and decode the token
    jwt.verify(token, 'test', (err, decodedData) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
      }

      req.userId = decodedData?.id; // Store the user ID in the request

      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const isEmployer = async (req, res, next) => {

    try {
        const User = await user.findById(req.userId);
        
        if(User.role === 'Employer') {
            next();
        }
        else {
            res.status(401).json({ message: "Only for employer" })
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
export const isCandidate = async (req, res, next) => {

    try {
        const User = await user.findById(req.userId);
        
        if(User.role === 'Candidate') {
            next();
        }
        else {
            res.status(401).json({ message: "Only for Candidates" })
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

// module.exports = {isAuthenticated, isEmployer}