import jwt from 'jsonwebtoken'
import user from '../models/user';

export const isAuthenticated = async(req, res, next) =>{

    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        
        const token = authHeader.split(' ')[1];
        
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export const isEmployer = async (req, res, next) => {

    try {
        const User = await user.findById(req.userId);
        
        if(User.role === 'employer') {
            next();
        }
        else {
            res.status(401).json({ message: "Only for employer" })
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

// module.exports = {isAuthenticated, isEmployer}