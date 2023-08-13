import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) caracters'],
    },
    id: {
        type: String
    },
    role: {
        type: String,
        enum: ["employer", "user"],
        required: true
    }
}, {timestamps: true})


export default mongoose.model("User", userSchema)