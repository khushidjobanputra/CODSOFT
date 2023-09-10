import mongoose from "mongoose";

const jobModel = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    // companyLogo:{
    //     data: Buffer,
    //     contentType: String
    // },
    description:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        default: [],
        required: true
    },
    numberOfOpenings:{
        type: Number
    },
    locations:{
        type: [String],
        default: [],
        required: true
    },
    experience:{
        type: Number,
    },
    jobRole:{
        type: String,
        required: true
    },
    employmentType:{
        type: String,
        required: true
    },
    salary:{
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    companyId: {
        type: String, 
        required: true  
    },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]
})

export default mongoose.model("jobModel", jobModel)