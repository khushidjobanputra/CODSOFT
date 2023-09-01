import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'e-mail is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'password must have at least (6) caracters'],
  },
  id: {
    type: String,
  },
  role: {
    type: String,
    enum: ['Employer', 'Candidate'],
    required: true,
  },
  userName: {
    type: String,
    required: [true, 'userName is required'],
    maxlength: 32,
},
}, { timestamps: true });

export default mongoose.model('User', userSchema);