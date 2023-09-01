import user from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async(req, res) =>{

    const {userName, email, password, confirmPassword, role} = req.body;

    try{
        const existingUser = await user.findOne({email});

        if(existingUser){
            return res.status(400).json({message: 'E-mail already registered'});
        }

        if(password!==confirmPassword){
            return res.status(400).json({message: 'Passwords donot match'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const User = await user.create({
            userName, email, password: hashedPassword, role
        })
        // console.log(User)

        const token = jwt.sign({email: User.email, id: User._id}, 'test', {expiresIn: "1h"});
        // console.log(token)

        res.status(200).json({message: 'User registered successfully', User, token})
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const signin = async(req, res) =>{

    const {email, password} = req.body;

    try{
        const existingUser = await user.findOne({email});

        if(!existingUser){
            return res.status(404).json({message: 'User does not exist'});
        }

        const iscorrectPassword = await bcrypt.compare(password, existingUser.password);

        if(!iscorrectPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        } 

        // console.log(exisitingUser)

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({message: 'User logged in successfully', existingUser, token})
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const userProfile = async(req, res) =>{
    
    const User = await user.findById(req.userId).select("-password")
    console.log(User)

    res.status(200).json({message: "user profile", User})
}