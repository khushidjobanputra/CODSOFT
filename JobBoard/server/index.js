import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';  
import jobRoutes from './routes/jobRoutes.js';  
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config();

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

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})