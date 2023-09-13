import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';  
import jobRoutes from './routes/jobRoutes.js';  
import applicationRoutes from './routes/applicationRoutes.js'
import saveJobRoutes from './routes/savedJobsRoutes.js'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import sendEmail from './routes/sendEmail.js'
import multer from 'multer';

const app = express()
dotenv.config();
const storage = multer.memoryStorage(); // Store file in memory as a buffer
const upload = multer({ storage });

//port
const PORT = process.env.PORT || 8000

//database connection
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Database connected"))
.catch((error) => console.log(error))

//middleware
app.use(bodyParser.json({limit: "5mb"}))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}))
app.use(cors())
app.use(cookieParser())

//routes
app.use('/user', userRoutes)
app.use('/jobs', jobRoutes)
app.use('/application', applicationRoutes)
app.use('/api', sendEmail)
app.use('/saveJob', saveJobRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})