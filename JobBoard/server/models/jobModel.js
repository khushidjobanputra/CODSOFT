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
    description:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        default: [],
        required: true
    },
    numberOfEmployees:{
        type: Number
    },
    location:{
        type: [String],
        default: [],
        required: true
    },
    experience:{
        type: Number,
    },
    logo:{
        type: String,
        required: true
    },
    Jobrole:{
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
    }
})

export default mongoose.model("jobModel", jobModel)